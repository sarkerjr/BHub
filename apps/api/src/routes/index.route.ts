import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import userRoutes from './user.routes';
import scraperRoutes from './scraper.routes';

const router = Router();

// Middleware
router.use(errorHandler);

router.get('/health', (_, res) => {
  res.send('OK');
});

router.use('/user', userRoutes);

router.use(scraperRoutes);

export default router;
