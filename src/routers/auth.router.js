import express from 'express'
import AuthRepository from '../repositories/auth.repository';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import { prisma } from './../utils/prisma.utils';

const authRouter = express.Router()
const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

export {authRouter}