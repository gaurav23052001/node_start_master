import mongoose from 'mongoose';
import { COMMON_MODEL_TYPES } from '../constants';

const userSchema = new mongoose.Schema({
  email: COMMON_MODEL_TYPES.TYPE_STRING_INDEX,
  password: COMMON_MODEL_TYPES.TYPE_STRING,
  name: COMMON_MODEL_TYPES.TYPE_STRING_INDEX,
  phone: COMMON_MODEL_TYPES.TYPE_NUMBER,
  country_code: COMMON_MODEL_TYPES.TYPE_NUMBER,
  country_name: COMMON_MODEL_TYPES.TYPE_STRING,
  dob: COMMON_MODEL_TYPES.TYPE_DATE_NULL,
  gender: COMMON_MODEL_TYPES.TYPE_STRING,
  marital_status: COMMON_MODEL_TYPES.TYPE_STRING,
  location: COMMON_MODEL_TYPES.TYPE_STRING,
  lat: COMMON_MODEL_TYPES.TYPE_STRING,
  lng: COMMON_MODEL_TYPES.TYPE_STRING,
  about: COMMON_MODEL_TYPES.TYPE_STRING,
  profile_image: COMMON_MODEL_TYPES.TYPE_STRING,
  is_deleted: COMMON_MODEL_TYPES.TYPE_BOOLEAN_FALSE_INDEX,
  last_login: COMMON_MODEL_TYPES.TYPE_DATE,
  social_media_provider: COMMON_MODEL_TYPES.TYPE_STRING_INDEX,
  social_media_provider_id: COMMON_MODEL_TYPES.TYPE_STRING_INDEX,
  email_verification_otp: COMMON_MODEL_TYPES.TYPE_STRING,
  email_verification_otp_created_time: COMMON_MODEL_TYPES.TYPE_DATE,
  phone_verification_otp: COMMON_MODEL_TYPES.TYPE_STRING,
  phone_verification_otp_created_time: COMMON_MODEL_TYPES.TYPE_DATE,
  forgot_password_otp: COMMON_MODEL_TYPES.TYPE_STRING,
  forgot_password_otp_created_time: COMMON_MODEL_TYPES.TYPE_DATE,
  is_verified_by_phone: COMMON_MODEL_TYPES.TYPE_BOOLEAN_FALSE_INDEX,
  is_verified_by_email: COMMON_MODEL_TYPES.TYPE_BOOLEAN_FALSE_INDEX,
  stripe_customer_id: COMMON_MODEL_TYPES.TYPE_STRING,
  is_admin: COMMON_MODEL_TYPES.TYPE_BOOLEAN_FALSE_INDEX,
  is_active: COMMON_MODEL_TYPES.TYPE_BOOLEAN_TRUE,
  otp_request: COMMON_MODEL_TYPES.TYPE_NUMBER,
  has_password_set: COMMON_MODEL_TYPES.TYPE_BOOLEAN_FALSE_INDEX,
}, {
  timestamps: true,
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
