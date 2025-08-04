import { IUserRepository } from './user.repository.interface';
import { injectable } from 'inversify';

export type User = {
  id: number;
  name: string;
};

@injectable()
export class UserRepository implements IUserRepository {
  private users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
