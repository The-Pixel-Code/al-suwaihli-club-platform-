import 'server-only';
import { db } from "./server";
import { users } from "./schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

// Hash password utility
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

// Create initial admin user
export async function createAdminUser(
  email: string,
  password: string,
  name: string
) {
  const hashedPassword = await hashPassword(password);
  
  try {
    const [user] = await db.insert(users).values({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: "SUPER_ADMIN",
      emailVerified: new Date(),
      isActive: true,
    }).returning();
    
    return user;
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }
}

// Check if admin exists
export async function adminExists(): Promise<boolean> {
  const adminUsers = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, "SUPER_ADMIN"))
    .limit(1);
    
  return adminUsers.length > 0;
}
