import Joi from 'joi';
import { commonUserValidations } from './commonValidations';
import { GENDER_TYPES, MARITAL_STATUS } from '../constants';

export const profileValidations = Joi.object().keys({
  name: commonUserValidations.name,
  phone: commonUserValidations.phone,
  country_name: Joi.string().max(100),
  country_code: Joi.string().max(10),
  dob: Joi.date().less('now'),
  gender: Joi.string().max(15).valid(GENDER_TYPES.MALE, GENDER_TYPES.FEMALE, GENDER_TYPES.OTHER),
  marital_status: Joi.string().max(15).valid(MARITAL_STATUS.SINGLE, MARITAL_STATUS.MARRIED, MARITAL_STATUS.WIDOWED, MARITAL_STATUS.SEPARATED, MARITAL_STATUS.WIDOWED),
  location: Joi.string().max(250),
  lat: Joi.number().precision(8),
  lng: Joi.number().precision(8),
  about: Joi.string(),
  profile_image: Joi.string(),
});

export const changePasswordValidations = Joi.object().keys({
  current_password: Joi.string().min(6).max(30).required(),
  new_password: commonUserValidations.password,
});
