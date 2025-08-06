import { eq } from 'drizzle-orm';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { media } from '../database/schema';
import { IMediaRepository } from './media.repository.interface';
import type { DatabaseInstance } from '../database/index';
import { TYPES } from '../inversify/types';
import { inject } from 'inversify';

export type Media = InferSelectModel<typeof media>;
export type NewMedia = InferInsertModel<typeof media>;

export class MediaRepository implements IMediaRepository {
  constructor(@inject(TYPES.DB) private db: DatabaseInstance) {}

  async create(newMedia: NewMedia): Promise<Media> {
    const insertResult = await this.db.insert(media).values({
      ...newMedia,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const [createdMedia] = await this.db
      .select()
      .from(media)
      .where(eq(media.id, insertResult[0].insertId))
      .limit(1);

    return createdMedia;
  }

  async getByProviderId(providerId: number): Promise<Media[]> {
    return this.db.select().from(media).where(eq(media.providerId, providerId));
  }
}
