import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IScraperService } from '../services/scraper.service.interface';
import { TYPES } from '../inversify/types';

@injectable()
export class ScraperController {
  constructor(
    @inject(TYPES.IScraperService) private scraperService: IScraperService
  ) {}

  async getData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.scraperService.getProviderData();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
