import express from 'express';
import ExamRepository from '../repositories/exam.repository.js';
import { prisma } from '../utils/prisma.utils.js';
import ExamService from '../services/exam.service.js';
import ExamController from '../controllers/exam.controller.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { verifyClassMember } from '../middlewares/verify-class-member.middleware.js';

const examRouter = express.Router({ mergeParams: true });
const examRepository = new ExamRepository(prisma);
const examService = new ExamService(examRepository);
const examController = new ExamController(examService);

//시험 일정 생성
examRouter.post(
  '',
  requireAccessToken('STUDENT'),
  verifyClassMember,
  examController.createExam,
);

//시험 일정 조회
examRouter.get(
  '',
  requireAccessToken(''),
  verifyClassMember,
  examController.getExam,
);

//시험 일정 수정

examRouter.patch(
  '/:examId',
  requireAccessToken(''),
  verifyClassMember,
  examController.updateExam,
);

//시험 일정 삭제
examRouter.delete(
  '/:examId',
  requireAccessToken(''),
  verifyClassMember,
  examController.deleteExam,
);

export { examRouter };
