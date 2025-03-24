import express from 'express';
import EmailRepository from '../repositories/email.repository.js';
import { prisma } from '../utils/prisma.utils.js';
import EmailService from '../services/email.service.js';
import EmailController from '../controllers/email.controller.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

const emailRouter = express.Router();
const emailRepository = new EmailRepository(prisma);
const emailService = new EmailService(emailRepository);
const emailController = new EmailController(emailService);

// 이메일 인증 코드 요청 API - 선생님 권한
emailRouter.post(
  '/request-verification',
  requireAccessToken,
  emailController.requestVerification,
);

// 이메일 인증 코드 확인 API - 학생권한
emailRouter.post(
  '/verify-code',
  requireAccessToken,
  emailController.verifyCryptogram,
);
export { emailRouter };
