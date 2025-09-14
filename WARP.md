# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Al-Suwaihli Club Platform - A bilingual (Arabic/English) Next.js 15 application for sports club management with multi-role admin dashboard and member portal.

## Development Commands

### Initial Setup
```bash
# Install dependencies
bun install

# Start PostgreSQL database (requires Docker)
bun run docker:up

# Push database schema
bun run db:push

# Seed database with initial data
bun run db:seed

# Start development server
bun dev
```

### Database Management
```bash
# Generate migrations
bun run db:generate

# Apply migrations  
bun run db:migrate

# Push schema to database
bun run db:push

# Open Drizzle Studio (database GUI)
bun run db:studio

# Reset database (drop, push, seed)
bun run db:reset

# Stop database
bun run docker:down
```

### Development Workflow
```bash
# Run development server (http://localhost:3000)
bun dev

# Build for production
bun build

# Start production server
bun start

# Run linting
bun lint
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript with strict mode
- **Database**: PostgreSQL with Drizzle ORM  
- **API**: Hono.js for API routes (`/api/[[...route]]`)
- **Auth**: NextAuth v4 with Drizzle adapter
- **Internationalization**: next-intl with Arabic (RTL) and English support
- **Styling**: Tailwind CSS v4 with Radix UI components
- **State Management**: TanStack Query + React Hook Form
- **Package Manager**: Bun (fallback to npm)

### Project Structure
```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── [[...route]]/    # Hono.js catch-all route
│   │   └── auth/            # NextAuth routes
│   └── [locale]/            # Localized pages (ar/en)
├── components/
│   ├── admin/               # Admin dashboard components
│   ├── providers/           # React context providers
│   └── ui/                  # Reusable UI components (Radix-based)
├── hooks/                   # Custom React hooks
├── i18n/                    # Internationalization config
│   └── routing.ts           # Locale routing setup
├── lib/
│   ├── auth/               # Authentication utilities
│   ├── db/                 # Database schema and utilities
│   │   ├── schema.ts       # Drizzle schema definitions
│   │   ├── seed.ts         # Database seeding script
│   │   └── migrations/     # Database migrations
│   └── rbac/               # Role-based access control
├── middleware.ts           # Next.js middleware (auth + i18n)
└── routes.ts              # Route definitions and permissions
```

### Key Architectural Patterns

#### 1. Internationalization
- Dynamic locale routing: `/[locale]/...`
- Messages stored in `messages/ar.json` and `messages/en.json`
- RTL support for Arabic automatically handled
- Middleware intercepts all requests for locale handling

#### 2. Authentication & Authorization
- NextAuth handles authentication with database sessions
- Middleware enforces authentication on protected routes
- Role-based access control (RBAC) with 6 roles:
  - SUPER_ADMIN: Full system access
  - ADMIN: General admin access
  - CONTENT_MANAGER: Content and media management
  - MEMBER_COORDINATOR: Member management
  - SPORTS_COORDINATOR: Sports team management
  - FINANCIAL_OFFICER: Financial management
  - MEMBER: Basic member access

#### 3. API Architecture
- Hono.js handles all API routes via catch-all route
- Type-safe API with Zod validation
- Protected API endpoints require authentication
- API routes: `/api/[[...route]]/route.ts`

#### 4. Database Layer
- Drizzle ORM for type-safe database operations
- PostgreSQL running in Docker container
- Schema defined in `src/lib/db/schema.ts`
- Migrations in `src/lib/db/migrations/`

## Development Guidelines

### Adding New Features

#### Creating a New Page
1. Add page component in `src/app/[locale]/your-page/page.tsx`
2. Add translations in `messages/ar.json` and `messages/en.json`
3. Update route permissions in `src/routes.ts` if needed

#### Adding API Endpoints
1. Extend Hono app in `src/app/api/[[...route]]/route.ts`
2. Use Zod for request validation
3. Check authentication if endpoint is protected

#### Database Changes
1. Update schema in `src/lib/db/schema.ts`
2. Generate migration: `bun run db:generate`
3. Apply migration: `bun run db:migrate`

### Working with Translations
```typescript
// In components
import { useTranslations } from 'next-intl';

const t = useTranslations('PageName');
// Use: t('key')
```

### Role-Based Route Protection
Routes are automatically protected based on patterns defined in `src/routes.ts`:
- Public routes: No authentication required
- Protected routes: Authentication required
- Admin routes: Specific role required

## Database Connection

Default PostgreSQL connection (Docker):
- Host: localhost
- Port: 5432
- Database: al_suwaihli_club
- User: club_admin
- Password: secure_password_123

pgAdmin available at: http://localhost:5050
- Email: admin@alsuwaihli.ly
- Password: admin123

## Environment Variables

Required in `.env.local`:
```bash
DATABASE_URL=postgresql://club_admin:secure_password_123@localhost:5432/al_suwaihli_club
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=[generate-with-openssl]
```

## Common Development Tasks

### Switch Between Languages
- Arabic: http://localhost:3000/ar
- English: http://localhost:3000/en

### Access Admin Dashboard
Navigate to `/[locale]/admin/dashboard` (requires admin role)

### Test Different User Roles
Use database seeding to create test users with different roles

### Debug Database Issues
1. Check Docker container: `docker ps`
2. View logs: `docker logs al_suwaihli_postgres`
3. Access database GUI: `bun run db:studio`

## Deployment Considerations

1. Set production environment variables
2. Use production database (not Docker)
3. Build optimized production bundle: `bun run build`
4. Configure proper NEXTAUTH_URL for production domain
5. Ensure Arabic fonts are properly loaded for RTL support
