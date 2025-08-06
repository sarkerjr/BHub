import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { registerUserModule } from './modules/user.module';
import { registerScraperModule } from './modules/scraper.module';
import { registerProviderModule } from './modules/provider.module';
import { registerMediaModule } from './modules/media.module';
import { db } from '../database';

const container = new Container();

// Bind the DB instance
container.bind<typeof db>(TYPES.DB).toConstantValue(db);

// Register all modules
registerUserModule(container);
registerScraperModule(container);
registerProviderModule(container);
registerMediaModule(container);

export { container };
