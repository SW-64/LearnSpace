import express from 'express';
import ClassRepository from '../repositories/class.repository.js';
import { prisma } from '../utils/prisma.utils.js';
import ClassService from '../services/class.service.js';
import ClassController from '../controllers/class.controller.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { verifyClassMember } from '../middlewares/verify-class-member.middleware.js';
import ScheduleRepository from '../repositories/schedule.repository.js';

const classRouter = express.Router({ mergeParams: true });
const classRepository = new ClassRepository(prisma);
const classService = new ClassService(classRepository);
const classController = new ClassController(classService);
const scheduleRepository = new ScheduleRepository(prisma);

//수업 일정 생성

classRouter.post(
  '/schedule',
  requireAccessToken('TEACHER'),
  verifyClassMember,
  classController.createClassSchedule,
);

export { classRouter };
