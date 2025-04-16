import AuthService from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class AuthController {
  authService = new AuthService();

  signUp = async (req, res, next) => {
    try {
      const { email, name, role, subject, password, passwordCheck } = req.body;

      const data = await this.authService.signUp({
        email,
        name,
        role,
        subject,
        password,
        passwordCheck,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = await this.authService.signIn({ email, password });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  signOut = async (req, res, next) => {
    try {
      const user = req.user;
      const data = await this.authService.signOut(user);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_OUT.SUCCEED,
        data: { id: user.id },
      });
    } catch (error) {
      next(error);
    }
  };

  Token = async (req, res, next) => {
    try {
      const user = req.user;
      const data = await this.authService.token(user);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.TOKEN.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
  // 카카오 로그인
  kakaoSignIn = async (req, res, next) => {
    try {
      const { user } = req.user;
      console.log('user', req.user);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SOCIAL.KAKAKO.SUCCEED,
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  };
  // 카카오 로그인 추가 정보 입력
  addKakaoInfo = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { role, subject } = req.body;

      const data = await this.authService.addKakaoInfo(userId, role, subject);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SOCIAL.KAKAKO.MORE_INFO,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
