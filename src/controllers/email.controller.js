import EmailService from '../services/email.service.js';
import { HTTP_STATUS } from './../constants/http-status.constant.js';

class EmailController {
  emailService = new EmailService();

  // 이메일 인증 코드 요청 API - 선생님 권한
  requestVerification = async (req, res, next) => {
    try {
      // 학생 이메일 가져오기
      const { email } = req.body;
      const requestVerification =
        await this.emailService.requestVerification(email);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '이메일 인증 코드 요청 완료',
        data: requestVerification,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default EmailController;
