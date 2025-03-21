import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import GradeRepository from '../repositories/grade.repository.js';
import GradeService from '../services/grade.service.js';
import GradeController from '../controllers/grade.controller.js';

const gradeRouter = express.Router();
const gradeRepository = new GradeRepository(prisma);
const gradeService = new GradeService(gradeRepository);
const gradeController = new GradeController(gradeService);

export { gradeRouter };
