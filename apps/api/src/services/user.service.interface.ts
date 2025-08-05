import { User } from '../repositories/user.repository';

export interface IUserService {
  getUsers(): Promise<User[]>;
  getUser(id: number): Promise<User | undefined>;
}
