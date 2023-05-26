import express from 'express';
import { changePassword, profile, updateProfile } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import validateMiddleware from '../middleware/validateMiddleware';
import { profileValidations, changePasswordValidations } from '../validations/userValidations';

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get('/profile', authenticate, profile);
userRoutes.post('/profile', authenticate, validateMiddleware(profileValidations, 'body'), updateProfile);
userRoutes.post('/change-password', authenticate, validateMiddleware(changePasswordValidations, 'body'), changePassword);

export default userRoutes;
