import { Container } from 'inversify';
import { TYPES } from '../types';
import { MediaRepository } from '../../repositories/media.repository';
import { MediaService } from '../../services/media.service';
import { MediaController } from '../../controllers/media.controller';
import { S3Service } from '../../services/aws/s3.service';

export const registerMediaModule = (container: Container) => {
  container
    .bind<MediaRepository>(TYPES.IMediaRepository)
    .to(MediaRepository)
    .inSingletonScope();

  container.bind<S3Service>(TYPES.S3Service).to(S3Service).inSingletonScope();
  container
    .bind<MediaService>(TYPES.IMediaService)
    .to(MediaService)
    .inSingletonScope();

  container
    .bind<MediaController>(TYPES.IMediaController)
    .to(MediaController)
    .inSingletonScope();
};
