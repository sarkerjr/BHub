export const TYPES = {
  // User
  IUserRepository: Symbol.for('IUserRepository'),
  IUserService: Symbol.for('IUserService'),
  IUserController: Symbol.for('IUserController'),

  // Scraper
  IScraperService: Symbol.for('IScraperService'),
  IScraperController: Symbol.for('IScraperController'),

  // Provider
  IProviderRepository: Symbol.for('IProviderRepository'),
  IProviderService: Symbol.for('IProviderService'),
  IProviderController: Symbol.for('IProviderController'),

  // Database
  DB: Symbol.for('DB'),
};
