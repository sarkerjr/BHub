import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import userRoutes from './user.routes';
import scraperRoutes from './scraper.routes';
import providerRoutes from './provider.routes';
import mediaRoutes from './media.routes';

const router = Router();
const apiRouter = Router();

// Health check
apiRouter.get('/health', (_, res) => {
  res.send('OK');
});

// Routes
apiRouter.use('/user', userRoutes);
apiRouter.use('/providers', providerRoutes);
apiRouter.use('/media', mediaRoutes);
apiRouter.use(scraperRoutes);

// Mount API routes
router.use('/api', apiRouter);

// Error handler
router.use(errorHandler);

export default router;
