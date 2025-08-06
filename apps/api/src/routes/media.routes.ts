import { Request, Response, NextFunction, Router } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { TYPES } from '../inversify/types';
import { IMediaController } from '../controllers/media.controller.interface';
import { container } from '../inversify/inversify.config';

const mediaController = container.get<IMediaController>(TYPES.IMediaController);
const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
});

// Upload media for a provider
router.post(
  '/providers/:providerId/media',
  upload.single('file'),
  mediaController.uploadMedia
);

// Get all media for a provider
router.get('/providers/:providerId/media', mediaController.getMediaByProviderId);

export default router;
