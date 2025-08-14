// import { db } from "./index";
// import { 
//   users, 
// } from "./schema";
// import { hashPassword } from "../utils";

// async function seed() {
//   try {
//     console.log("🌱 Seeding database...");

//     // Create admin user
//     const [adminUser] = await db.insert(users).values({
//       email: "admin@alsuwaihli.ly",
//       password: await hashPassword("admin123"),
//       name: "Super Administrator",
//       role: "SUPER_ADMIN",
//       emailVerified: new Date(),
//       isActive: true,
//     }).returning();

//     console.log("✅ Admin user created");

//     // Create content manager
//     const [contentManager] = await db.insert(users).values({
//       email: "content@alsuwaihli.ly",
//       password: await hashPassword("content123"),
//       name: "Content Manager",
//       role: "CONTENT_MANAGER",
//       emailVerified: new Date(),
//       isActive: true,
//     }).returning();

//     console.log("✅ Content manager created");

//     // Create some sports
//     const footballSport = await db.insert(sports).values({
//       name: "Football",
//       description: "Association Football",
//       isActive: true,
//     }).returning();

//     const basketballSport = await db.insert(sports).values({
//       name: "Basketball",
//       description: "Basketball Sport",
//       isActive: true,
//     }).returning();

//     console.log("✅ Sports created");

//     // Create teams
//     await db.insert(teams).values([
//       {
//         sportId: footballSport[0].id,
//         name: "Al-Suwaihli FC",
//         description: "Main football team",
//         coachId: adminUser.id,
//         isActive: true,
//       },
//       {
//         sportId: basketballSport[0].id,
//         name: "Al-Suwaihli Basketball",
//         description: "Main basketball team",
//         isActive: true,
//       }
//     ]);

//     console.log("✅ Teams created");

//     // Create news categories
//     const [sportsCategory] = await db.insert(newsCategories).values({
//       name: "Sports",
//       slug: "sports",
//       description: "Sports related news",
//     }).returning();

//     const [culturalCategory] = await db.insert(newsCategories).values({
//       name: "Cultural",
//       slug: "cultural", 
//       description: "Cultural events and activities",
//     }).returning();

//     console.log("✅ News categories created");

//     // Create sample news
//     await db.insert(news).values([
//       {
//         title: "Al-Suwaihli FC Wins Local Championship",
//         content: "Our football team has achieved a remarkable victory in the local championship...",
//         excerpt: "Al-Suwaihli FC claims championship title",
//         slug: "alsuwaihli-fc-wins-championship",
//         authorId: contentManager.id,
//         categoryId: sportsCategory.id,
//         isPublished: true,
//         publishedAt: new Date(),
//         tags: ["football", "championship", "victory"],
//       },
//       {
//         title: "Annual Cultural Festival Announcement", 
//         content: "We are pleased to announce our annual cultural festival...",
//         excerpt: "Join us for the annual cultural celebration",
//         slug: "annual-cultural-festival-2025",
//         authorId: contentManager.id,
//         categoryId: culturalCategory.id,
//         isPublished: true,
//         publishedAt: new Date(),
//         tags: ["culture", "festival", "community"],
//       }
//     ]);

//     console.log("✅ Sample news created");
//     console.log("🎉 Database seeded successfully!");
    
//   } catch (error) {
//     console.error("❌ Error seeding database:", error);
//     throw error;
//   }
// }

// // Run the seed function
// seed()
//   .catch((error) => {
//     console.error("Seed script failed:", error);
//     process.exit(1);
//   })
//   .finally(() => {
//     process.exit(0);
//   });