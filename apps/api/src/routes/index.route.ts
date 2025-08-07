import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import { authenticateJWT } from '../middleware/auth.middleware';
import userRoutes from './user.routes';
import scraperRoutes from './scraper.routes';
import providerRoutes from './provider.routes';
import mediaRoutes from './media.routes';
import authRoutes from './auth.routes';

const router = Router();
const apiRouter = Router();

// Health check
apiRouter.get('/health', (_, res) => {
  res.send('OK');
});

// Public routes
apiRouter.use('/auth', authRoutes);

// Protected routes
apiRouter.use('/user', authenticateJWT, userRoutes);
apiRouter.use('/providers', authenticateJWT, providerRoutes);
apiRouter.use('/media', authenticateJWT, mediaRoutes);
apiRouter.use(authenticateJWT, scraperRoutes);

// Mount API routes
router.use('/api', apiRouter);

// Error handler
router.use(errorHandler);

export default router;
