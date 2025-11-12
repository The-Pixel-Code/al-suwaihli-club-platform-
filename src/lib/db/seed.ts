// src/lib/db/seed.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import bcrypt from "bcryptjs";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// Create database connection for seed script
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });
const { users } = schema;

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 12);
    
    await db.insert(users).values({
      name: "Super Admin",
      email: "admin@alsuwaihli.club",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      emailVerified: new Date(),
      isActive: true,
    }).onConflictDoNothing();

    // Create sample content manager
    const contentManagerPassword = await bcrypt.hash("content123", 12);
    
    await db.insert(users).values({
      name: "Content Manager",
      email: "content@alsuwaihli.club", 
      password: contentManagerPassword,
      role: "CONTENT_MANAGER",
      emailVerified: new Date(),
      isActive: true,
    }).onConflictDoNothing();

    console.log("✅ Database seeded successfully!");
    console.log("📧 Admin email: admin@alsuwaihli.club");
    console.log("🔑 Admin password: admin123");
    console.log("📧 Content Manager email: content@alsuwaihli.club");
    console.log("🔑 Content Manager password: content123");
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed script failed:", error);
  process.exit(1);
});
