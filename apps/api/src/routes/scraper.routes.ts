import { Router } from 'express';
import { container } from '../inversify/inversify.config';
import { TYPES } from '../inversify/types';
import { IScraperController } from '../controllers/scraper.controller.interface';

const scraperController = container.get<IScraperController>(
  TYPES.IScraperController
);

const router = Router();

router.get('/data', scraperController.getData.bind(scraperController));

export default router;
