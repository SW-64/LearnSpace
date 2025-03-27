import express from 'express';
import AttendanceRepository from '../repositories/attendance.repository.js';
import { prisma } from '../utils/prisma.utils.js';
import AttendanceService from '../services/attendance.service.js';
import AttendanceController from '../controllers/attendance.controller.js';

const attendanceRouter = express.Router();
const attendanceRepository = new AttendanceRepository(prisma);
const attendanceService = new AttendanceService(attendanceRepository);
const attendanceController = new AttendanceController(attendanceService);

// 출석체크
attendanceRouter.use('', attendanceController.checkAttendance);

// 출석체크 조회

export { attendanceRouter };
