import express from 'express';
import AttendanceRepository from '../repositories/attendance.repository.js';
import { prisma } from '../utils/prisma.utils.js';
import AttendanceService from '../services/attendance.service.js';
import AttendanceController from '../controllers/attendance.controller.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { verifyClassMember } from '../middlewares/verify-class-member.middleware.js';

const attendanceRouter = express.Router({ mergeParams: true });
const attendanceRepository = new AttendanceRepository(prisma);
const attendanceService = new AttendanceService(attendanceRepository);
const attendanceController = new AttendanceController(attendanceService);

// 출석체크
attendanceRouter.post(
  '',
  requireAccessToken('TEACHER'),
  verifyClassMember,
  attendanceController.checkAttendance,
);

// 출석체크 조회
attendanceRouter.get(
  '',
  requireAccessToken(''),
  verifyClassMember,
  attendanceController.getAttendance,
);

export { attendanceRouter };
