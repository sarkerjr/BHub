import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import { authenticateJWT } from '../middleware/auth.middleware';
import { apiLimiter, authLimiter } from '../middleware/rateLimiter';
import userRoutes from './user.routes';
import scraperRoutes from './scraper.routes';
import providerRoutes from './provider.routes';
import mediaRoutes from './media.routes';
import authRoutes from './auth.routes';

const router = Router();
const apiRouter = Router();

// Health check
apiRouter.get('/health', apiLimiter, (_, res) => {
  res.send('OK');
});

// Public routes
apiRouter.use('/auth', authLimiter, authRoutes);

// Protected routes
apiRouter.use('/user', apiLimiter, authenticateJWT, userRoutes);
apiRouter.use('/providers', apiLimiter, authenticateJWT, providerRoutes);
apiRouter.use('/media', apiLimiter, authenticateJWT, mediaRoutes);
apiRouter.use(apiLimiter, authenticateJWT, scraperRoutes);

apiRouter.use(apiLimiter);

// Mount API routes
router.use('/api', apiRouter);

// Error handler
router.use(errorHandler);

export default router;
