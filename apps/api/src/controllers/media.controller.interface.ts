import { Request, Response, NextFunction } from 'express';

export interface IMediaController {
  uploadMedia(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMediaByProviderId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
