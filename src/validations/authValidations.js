import Joi from 'joi';
import { commonUserValidations } from './commonValidations';

const authValidations = {
  register: Joi.object().keys({
    name: commonUserValidations.name.required(),
    email: commonUserValidations.email,
    password: commonUserValidations.password,
    phone: commonUserValidations.phone.required(),
  }),
  login: Joi.object().keys({
    email: commonUserValidations.email,
    password: Joi.string().required(),
  }),
  socialLogin: Joi.object().keys({
    email: commonUserValidations.email,
    name: Joi.string().required(),
    accessToken: Joi.string().required().max(1000),
    providerId: Joi.string().required().max(100),
    phone: Joi.string().optional().allow('').allow(null),
    provider: Joi.string().required(),
  }),
  forgot_password: Joi.object().keys({
    email: commonUserValidations.email,
  }),
  reset_password: Joi.object().keys({
    email: commonUserValidations.email,
    forgot_password_otp: commonUserValidations.otp,
    password: commonUserValidations.password,
  }),
  email_verification_otp: Joi.object().keys({
    email: commonUserValidations.email,
  }),
  phone_verification_otp: Joi.object().keys({
    phone: commonUserValidations.phone.required(),
  }),
  verify_email: Joi.object().keys({
    otp: commonUserValidations.otp,
    email: commonUserValidations.email,
  }),
  verify_phone: Joi.object().keys({
    otp: commonUserValidations.otp,
    phone: commonUserValidations.phone.required(),
  }),
}

export default authValidations;
