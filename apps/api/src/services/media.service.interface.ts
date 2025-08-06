import type { Media } from '../repositories/media.repository';

export interface IMediaService {
  uploadMedia(file: Express.Multer.File, providerId: number): Promise<Media>;
  getMediaByProviderId(providerId: number): Promise<Media[]>;
}
