import { Container } from 'inversify';
import { AuthController } from '../../controllers/auth.controller';
import { AuthService } from '../../services/auth.service';
import { TYPES } from '../types';

export const registerAuthModule = (container: Container) => {
  container
    .bind<AuthService>(TYPES.IAuthService)
    .to(AuthService)
    .inSingletonScope();

  container
    .bind<AuthController>(TYPES.IAuthController)
    .to(AuthController)
    .inSingletonScope();

  return container;
};
