import { defineConfig } from 'drizzle-kit';
import { env } from './src/lib/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/database/schema/index.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
