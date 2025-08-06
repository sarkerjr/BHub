import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { IMediaRepository } from '../repositories/media.repository.interface';
import { IMediaService } from './media.service.interface';
import { Media } from '../repositories/media.repository';
import { s3Service } from './aws/s3.service';

@injectable()
export class MediaService implements IMediaService {
  constructor(
    @inject(TYPES.IMediaRepository) private mediaRepository: IMediaRepository
  ) {}

  async uploadMedia(
    file: Express.Multer.File,
    providerId: number
  ): Promise<Media> {
    const fileName = await s3Service.uploadFile(file, providerId);

    return this.mediaRepository.create({
      providerId,
      fileName,
    });
  }

  async getMediaByProviderId(providerId: number): Promise<Media[]> {
    return this.mediaRepository.getByProviderId(providerId);
  }
}
