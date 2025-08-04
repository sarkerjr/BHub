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

  getUsers(): User[] {
    return this.userRepository.getAll();
  }

  getUser(id: number): User | undefined {
    return this.userRepository.getById(id);
  }
}
