import express from 'express';
import AuthRepository from '../repositories/auth.repository.js';
import AuthService from '../services/auth.service.js';
import AuthController from '../controllers/auth.controller.js';
import { prisma } from './../utils/prisma.utils.js';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import { requireRefreshToken } from '../middlewares/require-refresh-token.middleware.js';
import '../strategy/kakao.strategy.js';
import passport from 'passport';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

const authRouter = express.Router();
const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/sign-up', signUpValidator, authController.signUp);

authRouter.post('/sign-in', signInValidator, authController.signIn);

authRouter.post('/sign-out', requireRefreshToken, authController.signOut);

authRouter.post('/token', requireRefreshToken, authController.Token);

authRouter.get(
  '/kakao/sign-in',
  passport.authenticate('kakao', {
    session: false,
    authType: 'reprompt',
  }),
);

authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', { session: false }),
  authController.kakaoSignIn,
);

authRouter.post(
  '/kakao/info',
  requireAccessToken(),
  authController.addKakaoInfo,
);

export { authRouter };
