import express from 'express';
import swaggerConfig from '../configs/swagger';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import swagger from 'swagger-ui-express';

const router = express.Router({ mergeParams: true });

// API document route
router.use('/docs', swagger.serve, swagger.setup(swaggerConfig));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
