// src/lib/db/schema.ts
import { pgTable, text, timestamp, uuid, boolean, pgEnum } from "drizzle-orm/pg-core";

// User roles enum
export const userRoleEnum = pgEnum('user_role', [
  'MEMBER',
  'CONTENT_MANAGER',
  'MEMBER_COORDINATOR', 
  'SPORTS_COORDINATOR',
  'FINANCIAL_OFFICER',
  'ADMIN',
  'SUPER_ADMIN'
]);

// Users table - simplified for JWT-only auth
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").default('MEMBER').notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
