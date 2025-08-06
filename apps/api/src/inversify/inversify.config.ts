import 'reflect-metadata';
import { Container } from 'inversify';
import { registerUserModule } from './modules/user.module';
import { registerScraperModule } from './modules/scraper.module';

const container = new Container();

registerUserModule(container);
registerScraperModule(container);

export { container };
