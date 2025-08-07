import type { ScrapedData } from '../lib/types';

export interface IScraperService {
  getProviderData(): Promise<ScrapedData[]>;
}
