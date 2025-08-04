import { User } from '../repositories/user.repository';

export interface IUserService {
  getUsers(): User[];
  getUser(id: number): User | undefined;
}
