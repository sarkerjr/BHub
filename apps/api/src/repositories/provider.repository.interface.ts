import type { Provider, NewProvider } from './provider.repository';

export interface IProviderRepository {
  getById(id: number): Promise<Provider | undefined>;
  getAll(search?: string): Promise<Provider[]>;
  getByNames(names: string[]): Promise<Provider[]>;
  createMany(providers: NewProvider[]): Promise<{ insertedCount: number }>;
  updateMany(updates: Array<{ id: number; bedCount: number }>): Promise<{ updatedCount: number }>;
}
