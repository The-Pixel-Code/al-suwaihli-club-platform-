// test-db.ts (create this in project root)
import 'dotenv/config';
import postgres from 'postgres';

const DATABASE_URL = "postgresql://club_admin:secure_password_123@localhost:5432/al_suwaihli_club";

async function testConnection() {
  console.log("🔗 Testing database connection...");
  console.log("📍 URL:", DATABASE_URL);
  
  try {
    const sql = postgres(DATABASE_URL, { prepare: false });
    
    // Test the connection
    const result = await sql`SELECT version()`;
    console.log("✅ Database connected successfully!");
    console.log("📊 PostgreSQL version:", result[0].version);
    
    await sql.end();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testConnection();
