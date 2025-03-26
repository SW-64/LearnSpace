import AuthRepository from '../repositories/auth.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MESSAGES } from '../constants/message.constant.js';
import {
  ConflictError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/http.error.js';
import { authConstant } from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

class AuthService {
  authRepository = new AuthRepository();

  signUp = async ({ email, name, role, subject, password, passwordCheck }) => {
    const existedUser = await this.authRepository.findUserByEmail(email);

    if (existedUser) {
      throw new ConflictError(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }
    if (password !== passwordCheck) {
      throw new ConflictError(
        MESSAGES.AUTH.COMMON.PASSWORD_CHECK.NOT_MATCHTED_WITH_PASSWORD,
      );
    }
    // 학생이 과목을 작성할려는 경우 에러발생
    if (role == 'STUDENT' && subject) {
      throw new BadRequestError(MESSAGES.AUTH.SIGN_UP.STUDENT_INVALID);
    }

    const data = await this.authRepository.create({
      email,
      name,
      role,
      subject,
      password,
    });

    return data;
  };

  signIn = async ({ email, password }) => {
    const user = await this.authRepository.findUserByEmail(email);

    const passwordCheck = user && bcrypt.compareSync(password, user.password);

    if (!passwordCheck) {
      throw new UnauthorizedError(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
    }

    const payload = { id: user.id };

    //access토큰 생성
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: authConstant.ACCESS_TOKEN_EXPIRED_IN,
    });

    return { accessToken };
  };
}

export default AuthService;
