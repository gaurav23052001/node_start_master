import Joi from 'joi';
import { COMMON_REGEX } from '../constants';
import validationMessages from '../messages/validationMessages';

export const commonUserValidations = {
  email: Joi.string().replace(COMMON_REGEX.spaces, '').max(180).email().required(),
  password: Joi.string().min(6).max(30).regex(COMMON_REGEX.password).message(validationMessages.PASSWORD_VALIDATION_ERROR).required(),
  otp: Joi.string().max(6).required(),
  phone: Joi.string().trim().min(3).max(20).pattern(COMMON_REGEX.phone),
  name: Joi.string().max(100),
};
