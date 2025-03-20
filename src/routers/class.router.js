import express from 'express'
import ClassRepository from '../repositories/class.repository';
import { prisma } from '../utils/prisma.utils';
import ClassService from '../services/class.service';
import ClassController from '../controllers/class.controller';

const classRouter = express.Router()
const classRepository = new ClassRepository(prisma);
const classService = new ClassService(classRepository);
const classController = new ClassController(classService);

export {classRouter}