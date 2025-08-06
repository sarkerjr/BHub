import { Container } from 'inversify';
import { TYPES } from '../types';
import { IScraperService } from '../../services/scraper.service.interface';
import { ScraperService } from '../../services/scraper.service';
import { IScraperController } from '../../controllers/scraper.controller.interface';
import { ScraperController } from '../../controllers/scraper.controller';

export function registerScraperModule(container: Container) {
  container
    .bind<IScraperService>(TYPES.IScraperService)
    .to(ScraperService)
    .inSingletonScope();
  container
    .bind<IScraperController>(TYPES.IScraperController)
    .to(ScraperController)
    .inSingletonScope();
}
