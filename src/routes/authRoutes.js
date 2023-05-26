import express from 'express';
import validateMiddleware from '../middleware/validateMiddleware';
import authValidations from '../validations/authValidations';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  emailVerificationOTP,
  emailVerification,
  phoneVerificationOTP,
  phoneVerification,
  socialLogin,
} from '../controllers/authController';

const authRoutes = express.Router({ mergeParams: true });

authRoutes.post('/register', validateMiddleware(authValidations.register, 'body'), register);
authRoutes.post('/login', validateMiddleware(authValidations.login, 'body'), login);
authRoutes.post('/forgot-password', validateMiddleware(authValidations.forgot_password, 'body'), forgotPassword);
authRoutes.post('/reset-password', validateMiddleware(authValidations.reset_password, 'body'), resetPassword);
authRoutes.post('/email-verification-otp', validateMiddleware(authValidations.email_verification_otp, 'body'), emailVerificationOTP);
authRoutes.post('/email-verification', validateMiddleware(authValidations.verify_email, 'body'), emailVerification);
authRoutes.post('/phone-verification-otp', validateMiddleware(authValidations.phone_verification_otp, 'body'), phoneVerificationOTP);
authRoutes.post('/phone-verification', validateMiddleware(authValidations.verify_phone, 'body'), phoneVerification);
authRoutes.post('/social/login', validateMiddleware(authValidations.socialLogin, 'body'), socialLogin);

export default authRoutes;
