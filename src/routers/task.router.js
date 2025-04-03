import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import TaskRepository from '../repositories/task.repository.js';
import TaskService from '../services/task.service.js';
import TaskController from '../controllers/task.controller.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { verifyClassMember } from './../middlewares/verify-class-member.middleware.js';

const taskRouter = express.Router({ mergeParams: true });
const taskRepository = new TaskRepository(prisma);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// 과제 생성
taskRouter.post(
  '',
  requireAccessToken('TEACHER'),
  verifyClassMember,
  taskController.makeTask,
);

// 과제 전체 조회
taskRouter.get(
  '',
  requireAccessToken(''),
  verifyClassMember,
  taskController.getAllTask,
);

// 과제 상세 조회
taskRouter.get(
  '/:taskId',
  requireAccessToken(''),
  verifyClassMember,
  taskController.getOneTask,
);

// 과제 수정
taskRouter.patch(
  '/:taskId',
  requireAccessToken('TEACHER'),
  verifyClassMember,
  taskController.updateTask,
);

// 과제 제출
taskRouter.post(
  '/:taskId/submissions',
  requireAccessToken('STUDENT'),
  verifyClassMember,
  taskController.submissionsTask,
);

// 과제 피드백 생성 / 수정
taskRouter.post(
  '/:taskId/feedback',
  requireAccessToken('TEACHER'),
  verifyClassMember,
  taskController.upsertTaskFeedback,
);

// 과제 피드백 삭제
taskRouter.delete(
  '/:taskId/feedback',
  requireAccessToken('TEACHER'),
  verifyClassMember,
  taskController.deleteTaskFeedback,
);

export { taskRouter };
