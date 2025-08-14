// # src/lib/db/index.ts

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Disable prefetch as it's not supported by "postgres" driver
const client = postgres(process.env.DATABASE_URL!, {
  max: 1,
  idle_timeout: 20,
  max_lifetime: 60 * 30
});

export const db = drizzle(client, { schema });

// Helper function to close the connection
export const closeDb = () => client.end();

