import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import GradeRepository from '../repositories/grade.repository.js';
import GradeService from '../services/grade.service.js';
import GradeController from '../controllers/grade.controller.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { verifyClassMember } from '../middlewares/verify-class-member.middleware.js';

const gradeRouter = express.Router({ mergeParams: true });
const gradeRepository = new GradeRepository(prisma);
const gradeService = new GradeService(gradeRepository);
const gradeController = new GradeController(gradeService);

// 성적 생성 및 수정
gradeRouter.post(
  '',
  requireAccessToken('STUDENT'),
  verifyClassMember,
  gradeController.upsertGrades,
);

// 성적 삭제
gradeRouter.delete(
  '/',
  requireAccessToken('STUDENT'),
  verifyClassMember,
  gradeController.deleteGrades,
);
export { gradeRouter };
