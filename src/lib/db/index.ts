// src/lib/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create connection only on server side
let client: postgres.Sql | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (typeof window === 'undefined') {
  // Server-side only
  client = postgres(process.env.DATABASE_URL, { 
    prepare: false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  
  db = drizzle(client, { schema });
}

if (!db) {
  throw new Error('Database connection failed - running on client side');
}

export { db };