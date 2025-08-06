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

  // Media
  IMediaRepository: Symbol.for('IMediaRepository'),
  IMediaService: Symbol.for('IMediaService'),
  IMediaController: Symbol.for('IMediaController'),

  // AWS
  S3Service: Symbol.for('S3Service'),

  // Database
  DB: Symbol.for('DB'),
};
