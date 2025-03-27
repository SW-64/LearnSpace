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
}

export default AuthController;
