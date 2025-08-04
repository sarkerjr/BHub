import { Router } from 'express';
import userRoutes from './user.routes';
import { errorHandler } from '../middleware/errorHandler';

const router = Router();

// Middleware
router.use(errorHandler);

router.get('/health', (_, res) => {
  res.send('OK');
});

router.use('/user', userRoutes);

export default router;
