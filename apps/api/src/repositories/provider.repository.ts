import { injectable, inject } from 'inversify';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { eq, inArray, or, like, sql } from 'drizzle-orm';
import { IProviderRepository } from './provider.repository.interface';
import type { DatabaseInstance } from '../database/index';
import { provider } from '../database/schema';
import { TYPES } from '../inversify/types';

export type Provider = InferSelectModel<typeof provider>;
export type NewProvider = InferInsertModel<typeof provider>;

@injectable()
export class ProviderRepository implements IProviderRepository {
  constructor(@inject(TYPES.DB) private db: DatabaseInstance) {}

  async getById(id: number): Promise<Provider | undefined> {
    const result = await this.db
      .select()
      .from(provider)
      .where(eq(provider.id, id));
    return result[0];
  }

  async getAll(search?: string): Promise<Provider[]> {
    const query = this.db.select().from(provider);
    
    if (search) {
      const searchTerm = `%${search}%`.toLowerCase();
      return await query.where(
        or(
          like(sql`LOWER(${provider.providerName})`, searchTerm),
          like(sql`LOWER(${provider.address})`, searchTerm),
          like(sql`LOWER(${provider.city})`, searchTerm),
          like(sql`LOWER(${provider.registeredCounty})`, searchTerm),
          like(sql`LOWER(${provider.zipCode})`, searchTerm),
          eq(provider.bedCount, Number(search) || 0)
        )
      );
    }
    
    return await query;
  }

  async getByNames(names: string[]): Promise<Provider[]> {
    if (names.length === 0) return [];
    return await this.db
      .select()
      .from(provider)
      .where(inArray(provider.providerName, names));
  }

  async createMany(
    providers: NewProvider[]
  ): Promise<{ insertedCount: number }> {
    if (providers.length === 0) return { insertedCount: 0 };

    const result = await this.db
      .insert(provider)
      .values(providers)
      .then((result) => result[0].affectedRows || 0);

    return { insertedCount: result };
  }

  async updateMany(
    updates: Array<{ id: number; bedCount: number }>
  ): Promise<{ updatedCount: number }> {
    if (updates.length === 0) return { updatedCount: 0 };

    const results = await Promise.all(
      updates.map(({ id, bedCount }) =>
        this.db
          .update(provider)
          .set({
            bedCount,
            updatedAt: new Date(),
          })
          .where(eq(provider.id, id))
          .then((result) => result[0].affectedRows)
      )
    );

    const updatedCount = results.reduce(
      (sum, affectedRows) => sum + (affectedRows || 0),
      0
    );
    return { updatedCount };
  }
}
