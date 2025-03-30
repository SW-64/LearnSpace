import express from 'express';
import { authRouter } from './auth.router.js';
import { emailRouter } from './email.router.js';
import { attendanceRouter } from './attendance.router.js';
import { taskRouter } from './task.router.js';
import { examRouter } from './exam.router.js';
import { classRouter } from './class.router.js';
import { gradeRouter } from './grade.router.js';

const apiRouter = express.Router();
const basicUrl = 'dashboard/teachers/:teacherId/students/:studentId';
// 인증 라우터
apiRouter.use('/api/auth', authRouter);

// 이메일 라우터
apiRouter.use(`/api/${basicUrl}/email`, emailRouter);

// 대시보드 - 출석 라우터
apiRouter.use(`/api/${basicUrl}/attendance`, attendanceRouter);

// 대시보드 - 과제 라우터
apiRouter.use(`/api/${basicUrl}/tasks`, taskRouter);

// 대시보드 - 시험 라우터
apiRouter.use('/api/exam', examRouter);

// 대시보드 - 수업 라우터
apiRouter.use('/api/class', classRouter);

// 대시보드 - 성적 라우터
apiRouter.use('/api/grade', gradeRouter);

export { apiRouter };
