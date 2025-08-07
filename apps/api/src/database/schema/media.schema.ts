import {
  bigserial,
  pgTable,
  integer,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const media = pgTable('media', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  providerId: integer('provider_id').notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: varchar('file_url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});
