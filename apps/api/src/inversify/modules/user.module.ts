import { Container } from 'inversify';
import { TYPES } from '../types';
import { IUserRepository } from '../../repositories/user.repository.interface';
import { IUserService } from '../../services/user.service.interface';
import { IUserController } from '../../controllers/user.controller.interface';
import { UserRepository } from '../../repositories/user.repository';
import { UserService } from '../../services/user.service';
import { UserController } from '../../controllers/user.controller';
import { db } from '../../database';

export function registerUserModule(container: Container) {
  container.bind<typeof db>(TYPES.DB).toConstantValue(db);
  container
    .bind<IUserRepository>(TYPES.IUserRepository)
    .to(UserRepository)
    .inSingletonScope();
  container
    .bind<IUserService>(TYPES.IUserService)
    .to(UserService)
    .inSingletonScope();
  container
    .bind<IUserController>(TYPES.IUserController)
    .to(UserController)
    .inSingletonScope();
}
