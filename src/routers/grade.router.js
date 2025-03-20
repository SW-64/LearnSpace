import express from 'express'
import { prisma } from '../utils/prisma.utils';
import GradeRepository from '../repositories/grade.repository';
import GradeService from '../services/grade.service';
import GradeController from '../controllers/grade.controller';

const gradeRouter = express.Router()
const gradeRepository = new GradeRepository(prisma);
const gradeService = new GradeService(gradeRepository);
const gradeController = new GradeController(gradeService);

export {gradeRouter}