import express from 'express'
import { prisma } from '../utils/prisma.utils';
import TaskRepository from '../repositories/task.repository';
import TaskService from '../services/task.service';
import TaskController from '../controllers/task.controller';

const taskRouter = express.Router()
const taskRepository = new TaskRepository(prisma);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

export {taskRouter}
