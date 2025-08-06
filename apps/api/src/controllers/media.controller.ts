import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { TYPES } from '../inversify/types';
import { IMediaController } from './media.controller.interface';
import { IMediaService } from '../services/media.service.interface';
import { BadRequestError } from '../errors/bad-request.error';
import { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

@injectable()
export class MediaController implements IMediaController {
  constructor(
    @inject(TYPES.IMediaService) private mediaService: IMediaService
  ) {}

  uploadMedia = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.file) {
        throw new BadRequestError('No file uploaded');
      }

      const providerId = parseInt(req.params.providerId, 10);
      if (isNaN(providerId)) {
        throw new BadRequestError('Invalid provider ID');
      }

      const media = await this.mediaService.uploadMedia(req.file, providerId);

      res.status(201).json({
        success: true,
        data: media,
      });
    } catch (error) {
      next(error);
    }
  };

  getMediaByProviderId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const providerId = parseInt(req.params.providerId, 10);
      if (isNaN(providerId)) {
        throw new BadRequestError('Invalid provider ID');
      }

      const media = await this.mediaService.getMediaByProviderId(providerId);

      res.status(200).json({
        success: true,
        data: media,
      });
    } catch (error) {
      next(error);
    }
  };
}
