import {
  bigserial,
  pgTable,
  integer,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const provider = pgTable('providers', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  providerName: varchar('provider_name', { length: 255 }).notNull().unique(),
  address: varchar('address', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  registeredCounty: varchar('registered_county', { length: 255 }).notNull(),
  zipCode: integer('zip_code').notNull(),
  bedCount: integer('bed_count').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});
