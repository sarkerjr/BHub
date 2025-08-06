import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import userRoutes from './user.routes';
import scraperRoutes from './scraper.routes';
import providerRoutes from './provider.routes';
import mediaRoutes from './media.routes';

const router = Router();

// Middleware
router.use(errorHandler);

const apiRouter = Router();

apiRouter.get('/health', (_, res) => {
  res.send('OK');
});

apiRouter.use('/user', userRoutes);
apiRouter.use('/providers', providerRoutes);
apiRouter.use('/media', mediaRoutes);
apiRouter.use(scraperRoutes);

router.use('/api', apiRouter);

export default router;
