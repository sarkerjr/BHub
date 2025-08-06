import { Request, Response, NextFunction } from 'express';

export interface IScraperController {
  getData(req: Request, res: Response, next: NextFunction): Promise<void>;
}
