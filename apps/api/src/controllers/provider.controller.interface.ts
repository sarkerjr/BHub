import { Request, Response, NextFunction } from 'express';

export interface IProviderController {
  processProviders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getAllProviders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  
  getProviderById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
