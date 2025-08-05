import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../repositories/user.repository';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getUser(id: number): Promise<User | undefined> {
    return await this.userRepository.getById(id);
  }
}
