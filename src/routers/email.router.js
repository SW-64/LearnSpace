import express from 'express'
import EmailRepository from '../repositories/email.repository';
import { prisma } from '../utils/prisma.utils';
import EmailService from '../services/email.service';
import EmailController from '../controllers/email.controller';

const emailRouter = express.Router()
const emailRepository = new EmailRepository(prisma);
const emailService = new EmailService(emailRepository);
const emailController = new EmailController(emailService);

export {emailRouter}