// // # drizzle.config.ts (in project root)

// import type { Config } from "drizzle-kit";
// import { loadEnvConfig } from "@next/env";

// const projectDir = process.cwd();
// loadEnvConfig(projectDir);

// export default {
//   schema: "./src/lib/db/schema.ts",
//   out: "./src/lib/db/migrations",
//   driver: "pglite",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
//   verbose: true,
//   strict: true,
// } satisfies Config;