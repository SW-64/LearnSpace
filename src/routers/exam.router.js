import express from 'express';
import ExamRepository from '../repositories/exam.repository.js';
import { prisma } from '../utils/prisma.utils.js';
import ExamService from '../services/exam.service.js';
import ExamController from '../controllers/exam.controller.js';

const examRouter = express.Router();
const examRepository = new ExamRepository(prisma);
const examService = new ExamService(examRepository);
const examController = new ExamController(examService);

export { examRouter };
