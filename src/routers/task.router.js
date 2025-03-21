import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import TaskRepository from '../repositories/task.repository.js';
import TaskService from '../services/task.service.js';
import TaskController from '../controllers/task.controller.js';

const taskRouter = express.Router();
const taskRepository = new TaskRepository(prisma);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

export { taskRouter };
