import express from 'express'
import ExamRepository from '../repositories/exam.repository';
import { prisma } from '../utils/prisma.utils';
import ExamService from '../services/exam.service';
import ExamController from '../controllers/exam.controller';

const examRouter = express.Router()
const examRepository = new ExamRepository(prisma);
const examService = new ExamService(examRepository);
const examController = new ExamController(examService);

export {examRouter}