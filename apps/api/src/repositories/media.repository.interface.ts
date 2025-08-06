import type { Media, NewMedia } from './media.repository';

export interface IMediaRepository {
  create(media: NewMedia): Promise<Media>;
  getByProviderId(providerId: number): Promise<Media[]>;
}
