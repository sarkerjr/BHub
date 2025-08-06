import { injectable } from 'inversify';
import { scrapeProviderData } from '../utils/scraper';
import { IScraperService } from './scraper.service.interface';
import type { ScrapedData } from '../lib/types';

@injectable()
export class ScraperService implements IScraperService {
  async getProviderData(): Promise<ScrapedData[]> {
    return await scrapeProviderData();
  }
}
