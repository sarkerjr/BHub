import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IProviderService } from '../services/provider.service.interface';
import { TYPES } from '../inversify/types';
import { IProviderController } from './provider.controller.interface';

@injectable()
export class ProviderController implements IProviderController {
  constructor(
    @inject(TYPES.IProviderService) private providerService: IProviderService
  ) {}

  async processProviders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { providers } = req.body;

      if (!providers || !Array.isArray(providers)) {
        res.status(400).json({
          success: false,
          message: 'Invalid request: providers array is required',
        });
        return;
      }

      const result = await this.providerService.processProviders(providers);

      res.status(200).json({
        success: true,
        data: result,
        message: `Successfully processed ${result.total} providers (${result.created} created, ${result.updated} updated)`,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllProviders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const search = req.query.search as string | undefined;
      const providers = await this.providerService.getAllProviders(search);

      res.status(200).json({
        success: true,
        data: providers,
        count: providers.length,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProviderById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid provider ID',
        });
        return;
      }

      const provider = await this.providerService.getProviderById(id);

      if (!provider) {
        res.status(404).json({
          success: false,
          message: 'Provider not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: provider,
      });
    } catch (err) {
      next(err);
    }
  }
}
