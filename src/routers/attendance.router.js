import express from 'express'
import AttendanceRepository from '../repositories/attendance.repository';
import { prisma } from '../utils/prisma.utils';
import AttendanceService from '../services/attendance.service';
import AttendanceController from '../controllers/attendance.controller';

const attendanceRouter = express.Router()
const attendanceRepository = new AttendanceRepository(prisma);
const attendanceService = new AttendanceService(attendanceRepository);
const attendanceController = new AttendanceController(attendanceService);

export {attendanceRouter}