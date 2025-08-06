import { ScrapedData } from '../utils/scraper';

export interface IScraperService {
  getProviderData(): Promise<ScrapedData[]>;
}
