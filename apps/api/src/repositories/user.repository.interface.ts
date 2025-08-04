import { User } from './user.repository';

export interface IUserRepository {
  getAll(): User[];
  getById(id: number): User | undefined;
}
