import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

type DatabaseInstance = NodePgDatabase<typeof schema>;

const db: DatabaseInstance = drizzle(process.env.DATABASE_URL!, { schema });

export { db, schema, type DatabaseInstance };
