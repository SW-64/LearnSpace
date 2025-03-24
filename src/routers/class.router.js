import express from 'express';
import ClassRepository from '../repositories/class.repository.js';
import { prisma } from '../utils/prisma.utils.js';
import ClassService from '../services/class.service.js';
import ClassController from '../controllers/class.controller.js';

const classRouter = express.Router();
const classRepository = new ClassRepository(prisma);
const classService = new ClassService(classRepository);
const classController = new ClassController(classService);

export { classRouter };
