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
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        throw new BadRequestError('No files uploaded');
      }

      const providerId = parseInt(req.params.providerId, 10);
      if (isNaN(providerId) || providerId <= 0) {
        throw new BadRequestError(
          'Invalid provider ID. Must be a positive number.'
        );
      }

      const uploadPromises = files.map((file) =>
        this.mediaService.uploadMedia(file, providerId)
      );
      const result = await Promise.all(uploadPromises);

      res.status(201).json({
        success: true,
        data: result,
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
