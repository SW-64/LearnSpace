import EmailRepository from '../repositories/email.repository.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';

class EmailService {
  emailRepository = new EmailRepository();

  requestVerification = async (email) => {
    // 유저 데이터에 email을 조회한 후, 있으면 통과 없으면 에러 처리
    // 추후 구현

    // 구글 활용을 위해 아이디, 비밀번호 세팅
    // const googleEmail = process.env.GOOGLE_EMAIL;
    // const googlePassword = process.env.GOOGLE_PASSWORD;
    // const emailService = process.env.EMAIL_SERVICE;

    // 인증 코드 구현
    const cryptogram = 'abcd';

    // createTransport = 메일 서버와 연결 설정, auth는 계정의 아이디 비번를 확인
    // const transporter = nodemailer.createTransport({
    //   service: emailService,
    //   auth: {
    //     user: googleEmail,
    //     pass: googlePassword,
    //   },
    // });

    // mailOption = 보낼 메일의 내용 설정
    // const mailOptions = {
    //   from: googleEmail, //작성자
    //   to: email, // 수신자
    //   subject: 'Nodemailer Test', // 메일 제목
    //   text: cryptogram, // 메일 내용
    // };

    // sendMail = 실제로 메일을 보내는 함수
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log('Email Sent : ', info);
    //   }
    // });

    return cryptogram;
  };
}

export default EmailService;
