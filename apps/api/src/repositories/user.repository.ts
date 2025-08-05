import { injectable, inject } from 'inversify';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { IUserRepository } from './user.repository.interface';
import type { DatabaseInstance } from '../database/index';
import { user } from '../database/schema';
import { TYPES } from '../inversify/types';

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.DB) private db: DatabaseInstance) {}

  async getAll(): Promise<User[]> {
    return await this.db.select().from(user);
  }

  async getById(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(user).where(eq(user.id, id));
    return result[0];
  }
}
