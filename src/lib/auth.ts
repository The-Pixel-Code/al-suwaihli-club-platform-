// // Updated src/lib/auth.ts with proper NextAuth setup
// import { NextAuthOptions } from "next-auth";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { db } from "@/lib/db"; // Adjust the import path as necessary
// import { users } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";
// import bcrypt from "bcryptjs";

// export const authOptions: NextAuthOptions = {
//   adapter: DrizzleAdapter(db),
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { 
//           label: "Email", 
//           type: "email",
//           placeholder: "your-email@example.com"
//         },
//         password: { 
//           label: "Password", 
//           type: "password",
//           placeholder: "Your password"
//         }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing credentials");
//         }

//         try {
//           const userResult = await db
//             .select({
//               id: users.id,
//               email: users.email,
//               name: users.name,
//               password: users.password,
//               role: users.role,
//               isActive: users.isActive,
//               image: users.image,
//             })
//             .from(users)
//             .where(eq(users.email, credentials.email.toLowerCase()))
//             .limit(1);

//           const user = userResult[0];

//           if (!user) {
//             throw new Error("No user found with this email");
//           }

//           if (!user.isActive) {
//             throw new Error("Account is deactivated");
//           }

//           if (!user.password) {
//             throw new Error("No password set for this account");
//           }

//           const isPasswordValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );

//           if (!isPasswordValid) {
//             throw new Error("Invalid password");
//           }

//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//             role: user.role,
//             image: user.image,
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           throw new Error("Authentication failed");
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   jwt: {
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   callbacks: {
//     async jwt({ token, user, trigger, session }) {
//       // Initial sign in
//       if (user) {
//         token.role = user.role;
//       }

//       // Handle session updates
//       if (trigger === "update" && session) {
//         token.role = session.role;
//         token.name = session.name;
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.sub!;
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // Handle redirects after sign in/out
//       if (url.startsWith("/")) return `${baseUrl}${url}`;
//       if (new URL(url).origin === baseUrl) return url;
//       return baseUrl;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/error",
//   },
//   events: {
//     async signIn({ user, isNewUser }) {
//       console.log(`User ${user.email} signed in. New user: ${isNewUser}`);
//     },
//     async signOut({ session }) {
//       console.log(`User signed out: ${session?.user?.email}`);
//     },
//   },
//   debug: process.env.NODE_ENV === "development",
//   secret: process.env.NEXTAUTH_SECRET,
// };