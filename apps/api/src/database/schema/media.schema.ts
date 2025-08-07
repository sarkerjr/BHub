import {
  mysqlTable,
  timestamp,
  serial,
  varchar,
  int,
} from 'drizzle-orm/mysql-core';

export const media = mysqlTable('media', {
  id: serial('id').primaryKey(),
  providerId: int('provider_id').notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: varchar('file_url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});
