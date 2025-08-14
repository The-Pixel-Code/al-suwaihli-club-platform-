// Updated src/routes.ts
/**
 * Route definitions and access control for Al-Suwaihli Club Platform
 */

// Public routes - accessible to everyone
export const publicRoutes = [
  "/",
  "/about",
  "/sports",
  "/cultural-events",
  "/news",
  "/contact",
  "/auth/error",
];

// Auth routes - redirect authenticated users away
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset-password",
  "/auth/new-password",
  "/auth/verify-email",
];

// Protected routes that require authentication but no specific role
export const protectedRoutes = [
  "/profile",
  "/settings",
  "/membership",
];

// Admin routes with role-based access control
export const adminRoutes = {
  // Super admin only
  superAdmin: [
    "/admin/users/management",
    "/admin/system/settings",
    "/admin/system/backups",
    "/admin/roles/management",
  ],
  
  // Admin and Super Admin
  admin: [
    "/admin/dashboard",
    "/admin/overview",
    "/admin/reports",
  ],
  
  // Content managers
  contentManager: [
    "/admin/content",
    "/admin/content/pages",
    "/admin/content/news",
    "/admin/content/media",
    "/admin/events",
  ],
  
  // Member coordinators
  memberCoordinator: [
    "/admin/members",
    "/admin/members/list",
    "/admin/members/registrations",
    "/admin/communications",
  ],
  
  // Sports coordinators
  sportsCoordinator: [
    "/admin/sports",
    "/admin/sports/teams",
    "/admin/sports/matches",
    "/admin/sports/training",
  ],
  
  // Financial officers
  financialOfficer: [
    "/admin/finances",
    "/admin/finances/payments",
    "/admin/finances/reports",
    "/admin/invoices",
  ],
};

// API authentication prefix
export const apiAuthPrefix = "/api/auth";

// API routes that require authentication
export const protectedApiRoutes = [
  "/api/users",
  "/api/members",
  "/api/admin",
];

// Default redirect paths after login based on role
export const roleRedirects = {
  SUPER_ADMIN: "/admin/dashboard",
  ADMIN: "/admin/dashboard",
  CONTENT_MANAGER: "/admin/content",
  MEMBER_COORDINATOR: "/admin/members",
  SPORTS_COORDINATOR: "/admin/sports",
  FINANCIAL_OFFICER: "/admin/finances",
  MEMBER: "/profile",
} as const;

// Helper function to check if route requires specific role
export function getRequiredRoles(pathname: string): string[] {
  // Check each admin route category
  for (const [roleKey, routes] of Object.entries(adminRoutes)) {
    if (routes.some(route => pathname.startsWith(route))) {
      switch (roleKey) {
        case 'superAdmin':
          return ['SUPER_ADMIN'];
        case 'admin':
          return ['SUPER_ADMIN', 'ADMIN'];
        case 'contentManager':
          return ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'];
        case 'memberCoordinator':
          return ['SUPER_ADMIN', 'ADMIN', 'MEMBER_COORDINATOR'];
        case 'sportsCoordinator':
          return ['SUPER_ADMIN', 'ADMIN', 'SPORTS_COORDINATOR'];
        case 'financialOfficer':
          return ['SUPER_ADMIN', 'ADMIN', 'FINANCIAL_OFFICER'];
      }
    }
  }
  return [];
}

// Helper function to check if route is public
export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => {
    if (route === "/") {
      return pathname === "/" || pathname === "/en" || pathname === "/ar";
    }
    return pathname.includes(route);
  });
}

// Helper function to check if route is auth route
export function isAuthRoute(pathname: string): boolean {
  return authRoutes.some(route => pathname.includes(route));
}

// Helper function to check if route requires authentication
export function requiresAuth(pathname: string): boolean {
  // Skip API auth routes
  if (pathname.startsWith(apiAuthPrefix)) return false;
  
  // Public routes don't require auth
  if (isPublicRoute(pathname)) return false;
  
  // Auth routes don't require auth (but redirect if already authenticated)
  if (isAuthRoute(pathname)) return false;
  
  // Protected routes require auth
  if (protectedRoutes.some(route => pathname.includes(route))) return true;
  
  // Admin routes require auth
  const allAdminRoutes = Object.values(adminRoutes).flat();
  if (allAdminRoutes.some(route => pathname.startsWith(route))) return true;
  
  // API routes (except auth) require auth
  if (pathname.startsWith("/api") && !pathname.startsWith(apiAuthPrefix)) return true;
  
  return false;
}
