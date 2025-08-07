import type { User, NewUser } from './user.repository';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(user: NewUser): Promise<User>;
}
