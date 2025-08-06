import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { IProviderRepository } from '../repositories/provider.repository.interface';
import { IProviderService } from './provider.service.interface';
import { NewProvider } from '../repositories/provider.repository';
import { Provider } from '../repositories/provider.repository';

@injectable()
export class ProviderService implements IProviderService {
  constructor(
    @inject(TYPES.IProviderRepository)
    private providerRepository: IProviderRepository
  ) {}

  async processProviders(providers: NewProvider[]): Promise<{
    created: number;
    updated: number;
    total: number;
  }> {
    if (providers.length === 0) {
      return { created: 0, updated: 0, total: 0 };
    }

    // get existing providers by name
    const providerNames = providers.map((p) => p.providerName);
    const existingProviders =
      await this.providerRepository.getByNames(providerNames);
    const existingProviderMap = new Map(
      existingProviders.map((p) => [p.providerName, p])
    );

    // separate new providers from existing ones
    const newProviders: NewProvider[] = [];
    const updates: Array<{ id: number; bedCount: number }> = [];

    for (const provider of providers) {
      const existing = existingProviderMap.get(provider.providerName);
      if (existing) {
        updates.push({ id: existing.id, bedCount: provider.bedCount });
      } else {
        newProviders.push(provider);
      }
    }

    const [createResult, updateResult] = await Promise.all([
      newProviders.length > 0
        ? this.providerRepository.createMany(newProviders)
        : Promise.resolve({ insertedCount: 0 }),
      updates.length > 0
        ? this.providerRepository.updateMany(updates)
        : Promise.resolve({ updatedCount: 0 }),
    ]);

    return {
      created: createResult.insertedCount,
      updated: updateResult.updatedCount,
      total: createResult.insertedCount + updateResult.updatedCount,
    };
  }

  async getAllProviders(search?: string): Promise<Provider[]> {
    return this.providerRepository.getAll(search);
  }

  async getProviderById(id: number): Promise<Provider | undefined> {
    return this.providerRepository.getById(id);
  }
}
