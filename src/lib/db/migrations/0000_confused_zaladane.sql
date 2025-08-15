CREATE TYPE "public"."user_role" AS ENUM('MEMBER', 'CONTENT_MANAGER', 'MEMBER_COORDINATOR', 'SPORTS_COORDINATOR', 'FINANCIAL_OFFICER', 'ADMIN', 'SUPER_ADMIN');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'MEMBER' NOT NULL,
	"email_verified" timestamp,
	"image" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
