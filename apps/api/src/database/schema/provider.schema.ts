import {
  mysqlTable,
  timestamp,
  serial,
  varchar,
  int,
} from 'drizzle-orm/mysql-core';

export const provider = mysqlTable('providers', {
  id: serial('id').primaryKey(),
  providerName: varchar('provider_name', { length: 255 }).notNull().unique(),
  address: varchar('address', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  registeredCounty: varchar('registered_county', { length: 255 }).notNull(),
  zipCode: int('zip_code').notNull(),
  bedCount: int('bed_count').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});
