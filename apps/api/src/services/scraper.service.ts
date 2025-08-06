import { injectable } from 'inversify';
import { scrapeProviderData, ScrapedData } from '../utils/scraper';
import { IScraperService } from './scraper.service.interface';

@injectable()
export class ScraperService implements IScraperService {
  async getProviderData(): Promise<ScrapedData[]> {
    return await scrapeProviderData();
  }
}
