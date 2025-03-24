import express from 'express';
import AuthRepository from '../repositories/auth.repository.js';
import AuthService from '../services/auth.service.js';
import AuthController from '../controllers/auth.controller.js';
import { prisma } from './../utils/prisma.utils.js';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';

const authRouter = express.Router();
const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/sign-up', signUpValidator, authController.signUp);

authRouter.post('/sign-in', signInValidator, authController.signIn);

export { authRouter };
