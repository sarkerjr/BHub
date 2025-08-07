import { Request, Response, NextFunction, Router } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { TYPES } from '../inversify/types';
import { IMediaController } from '../controllers/media.controller.interface';
import { container } from '../inversify/inversify.config';

const mediaController = container.get<IMediaController>(TYPES.IMediaController);
const router = Router();

const createFileHandler = (fieldName: string) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit per file
      files: 10,
    },
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(
          new Error('Only image files are allowed (jpg, jpeg, png, gif)!')
        );
      }

      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'));
      }

      cb(null, true);
    },
  });

  return upload.array(fieldName, 10);
};

const handleFiles = (req: Request, res: Response, next: NextFunction) => {
  // check which field name is being used
  const fieldName = req.headers['content-type']?.includes('name="files[]"')
    ? 'files[]'
    : 'file';
  const uploader = createFileHandler(fieldName);

  uploader(req, res, (err: any) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    next();
  });
};

const handleUploadError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while uploading the file',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
  next();
};

router.post('/providers/:providerId', handleFiles, mediaController.uploadMedia);

router.get('/providers/:providerId', mediaController.getMediaByProviderId);

export default router;
