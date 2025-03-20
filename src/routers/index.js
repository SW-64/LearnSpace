import express from 'express'
import { authRouter } from './auth.router';
import { emailRouter } from './email.router';
import { attendanceRouter } from './attendance.router';
import { taskRouter } from './task.router';
import { examRouter } from './exam.router';
import { classRouter } from './class.router';
import { gradeRouter } from './grade.router';


const apiRouter = express.Router()

// 인증 라우터
apiRouter.use('/api/auth', authRouter);

// 이메일 라우터
apiRouter.use('/api/email', emailRouter);

// 대시보드 - 출석 라우터
apiRouter.use('/api/attendance', attendanceRouter);

// 대시보드 - 과제 라우터
apiRouter.use('/api/task', taskRouter);

// 대시보드 - 시험 라우터
apiRouter.use('/api/exam', examRouter);

// 대시보드 - 수업 라우터
apiRouter.use('/api/class', classRouter);

// 대시보드 - 성적 라우터
apiRouter.use('/api/grade', gradeRouter);

export {apiRouter}