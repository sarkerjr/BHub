import { Container } from 'inversify';
import { TYPES } from '../types';
import { IProviderRepository } from '../../repositories/provider.repository.interface';
import { IProviderService } from '../../services/provider.service.interface';
import { IProviderController } from '../../controllers/provider.controller.interface';
import { ProviderRepository } from '../../repositories/provider.repository';
import { ProviderService } from '../../services/provider.service';
import { ProviderController } from '../../controllers/provider.controller';

export function registerProviderModule(container: Container) {
  container
    .bind<IProviderRepository>(TYPES.IProviderRepository)
    .to(ProviderRepository)
    .inSingletonScope();
  container
    .bind<IProviderService>(TYPES.IProviderService)
    .to(ProviderService)
    .inSingletonScope();
  container
    .bind<IProviderController>(TYPES.IProviderController)
    .to(ProviderController)
    .inSingletonScope();
}
