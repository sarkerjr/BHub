import apiClient from '@/lib/api';

export interface ScrapedProvider {
  providerName: string;
  address: string;
  city: string;
  registeredCounty: string;
  zipCode: string;
  bedCount: number;
  [key: string]: string | number | null | undefined;
}

export interface SaveResult {
  success: boolean;
  message: string;
  data: {
    created: number;
    updated: number;
    total: number;
  };
}

export const ScraperService = {
  async fetchScrapedData(): Promise<ScrapedProvider[]> {
    try {
      const response = await apiClient.get('/data');
      return response;
    } catch (error) {
      console.error('Error fetching scraped data:', error);
      throw error;
    }
  },

  async saveToDatabase(providers: ScrapedProvider[]): Promise<SaveResult> {
    try {
      const response = await apiClient.post('/providers', { providers });
      return response;
    } catch (error) {
      console.error('Error saving to database:', error);
      throw error;
    }
  },
};

export default ScraperService;
