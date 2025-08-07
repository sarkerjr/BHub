import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { IMediaRepository } from '../repositories/media.repository.interface';
import { IMediaService } from './media.service.interface';
import { Media } from '../repositories/media.repository';
import { IS3Service } from './aws/s3.service.interface';
import { env } from '../lib/env';

@injectable()
export class MediaService implements IMediaService {
  constructor(
    @inject(TYPES.IMediaRepository) private mediaRepository: IMediaRepository,
    @inject(TYPES.IS3Service) private s3Service: IS3Service
  ) {}

  async uploadMedia(
    file: Express.Multer.File,
    providerId: number
  ): Promise<Media> {
    const fileName = await this.s3Service.uploadFile(file, providerId);
    const fileUrl = `${env.AWS_ENDPOINT}/${env.AWS_S3_BUCKET_NAME}/${fileName}`;

    return this.mediaRepository.create({
      providerId,
      fileName,
      fileUrl,
    });
  }

  async getMediaByProviderId(providerId: number): Promise<Media[]> {
    return this.mediaRepository.getByProviderId(providerId);
  }
}
