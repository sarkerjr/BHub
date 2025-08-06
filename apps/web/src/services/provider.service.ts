import apiClient from '@/lib/api';
import { Provider } from '@/lib/types';

export type SearchProviderResponse = {
  success: boolean;
  count: number;
  data: Provider[];
};

export const ProviderService = {
  async searchProviders(searchTerm: string): Promise<Provider[]> {
    try {
      const response: SearchProviderResponse =
        await apiClient.get<SearchProviderResponse>('/providers', {
          params: { search: searchTerm },
        });
      return response.data;
    } catch (error) {
      console.error('Error searching providers:', error);
      throw error;
    }
  },

  async getProviderById(id: string): Promise<Provider> {
    try {
      const response = await apiClient.get<{ success: boolean; data: Provider }>(`/providers/${id}`);
      if (!response.success) {
        throw new Error('Failed to fetch provider');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching provider:', error);
      throw error;
    }
  },
};

export default ProviderService;
