import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import { authConstant } from '../../constants/auth.constant.js';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  name: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQUIRED,
  }),
  role: Joi.string().valid('STUDENT', 'TEACHER').messages({
    'any.required': MESSAGES.AUTH.COMMON.ROLE.REQUIRED,
  }),
  subject: Joi.string().when('role', {
    is: 'TEACHER',
    then: Joi.required().messages({
      'any.required': MESSAGES.AUTH.COMMON.SUBJECT.REQUIRED,
    }),
    otherwise: Joi.optional(),
  }),
  password: Joi.string()
    .required()
    .min(authConstant.MIN_PASSWORD_LENGTH)
    .messages({
      'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
      'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
    }),
  passwordCheck: Joi.string()
    .required()
    .min(authConstant.MIN_PASSWORD_LENGTH)
    .messages({
      'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CHECK.REQUIRED,
      'any.only':
        MESSAGES.AUTH.COMMON.PASSWORD_CHECK.NOT_MATCHTED_WITH_PASSWORD,
    }),
});

export const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
