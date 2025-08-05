import { drizzle } from 'drizzle-orm/mysql2';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { env } from '../lib/env';
import * as schema from './schema/index';

type DatabaseInstance = MySql2Database<typeof schema>;

const db = drizzle(env.DATABASE_URL);

export { db, schema, type DatabaseInstance };
