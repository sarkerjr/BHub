import type {
  Provider,
  NewProvider,
} from '../repositories/provider.repository';

export interface IProviderService {
  processProviders(
    providers: NewProvider[]
  ): Promise<{ created: number; updated: number; total: number }>;
  
  getAllProviders(search?: string): Promise<Provider[]>;
  
  getProviderById(id: number): Promise<Provider | undefined>;
}
