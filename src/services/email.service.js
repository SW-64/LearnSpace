import EmailRepository from '../repositories/email.repository.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import Redis from 'ioredis';
import AuthRepository from '../repositories/auth.repository.js';
import { ConflictError, NotFoundError } from '../errors/http.error.js';
import ClassRepository from '../repositories/class.repository.js';

class EmailService {
  emailRepository = new EmailRepository();
  authRepository = new AuthRepository();
  classRepository = new ClassRepository();

  // 이메일 인증 코드 요청 API - 선생님 권한
  requestVerification = async (email) => {
    // 유저 데이터에 email을 조회한 후, 있으면 통과 없으면 에러 처리
    const existedEmail = await this.authRepository.findUserByEmail(email);
    if (!existedEmail) throw new NotFoundError('이메일이 존재하지 않습니다.');

    /*
    // 구글 활용을 위해 아이디, 비밀번호 세팅
    const googleEmail = process.env.GOOGLE_EMAIL;
    const googlePassword = process.env.GOOGLE_PASSWORD;
    const emailService = process.env.EMAIL_SERVICE;
    */
    // 인증 코드 생성 및 선생님 데이터 추가
    const cryptogram = generate4DigitRandom();

    // redis를 활용해 인증 번호를 10분동안만 저장
    const redis = new Redis();
    const key = `cryptogram:${email}`;
    const value = cryptogram;

    await redis.set(key, value, 'EX', 600); // 600초 = 10분 TTL
    /*
    // createTransport = 메일 서버와 연결 설정, auth는 계정의 아이디 비번를 확인
    const transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: googleEmail,
        pass: googlePassword,
      },
    });

    // mailOption = 보낼 메일의 내용 설정
    const mailOptions = {
      from: googleEmail, //작성자
      to: email, // 수신자
      subject: 'Nodemailer Test', // 메일 제목
      text: cryptogram, // 메일 내용
    };

    // sendMail = 실제로 메일을 보내는 함수
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email Sent : ', info);
      }
    });
    */

    return cryptogram;
  };

  // 이메일 인증 확인 요청 API - 학생 권한
  verifyCryptogram = async (verifyNumber, user) => {
    // email로 가져온 key값으로 value( 인증번호 ) 찾기
    const userEmail = user.email;
    const key = `cryptogram:${userEmail}`;
    const redis = new Redis();
    const cryptogram = await redis.get(key);

    // // JSON parse로 값 꺼내기
    // const parsed = JSON.parse(value);
    // const cryptogram = parsed.cryptogram;
    // const teacherId = parsed.id;
    // const subject = parsed.subject;

    // 만약 인증코드가 만료되었다면 에러처리
    if (!cryptogram) {
      throw new NotFoundError('인증코드가 만료되었거나 존재하지 않습니다.');
    }

    // 인증코드가 입력한 숫자와 다르다면 에러처리
    if (cryptogram !== verifyNumber) {
      throw new ConflictError('인증 코드가 일치하지 않습니다.');
    }

    // 검증 성공했기에 수업 테이블에 데이터 저장

    const classData = await this.classRepository.createClass(
      teacherId,
      subject,
      userId,
    );
    // 인증 처리 후, 인증 코드 삭제
    await redis.del;

    return classData;
  };
}
// 인증 코드 구현
const generate4DigitRandom = () => {
  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export default EmailService;
