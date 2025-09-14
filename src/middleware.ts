// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { routing } from "./i18n/routing";
import { 
  isPublicRoute, 
  isAuthRoute, 
  requiresAuth, 
  getRequiredRoles,
  apiAuthPrefix 
} from "./routes";

const intlMiddleware = createMiddleware(routing);

export default withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Always allow API auth routes
        if (pathname.startsWith(apiAuthPrefix)) {
          return true;
        }

        // Remove locale prefix for route checking
        const cleanPath = pathname.replace(/^\/(en|ar)/, '') || '/';

        // Allow public routes (no authentication needed)
        if (isPublicRoute(cleanPath)) {
          return true;
        }

        // Auth routes - redirect if already authenticated
        if (isAuthRoute(cleanPath)) {
          // If user is authenticated, they should be redirected away from auth pages
          return !token;
        }

        // For protected routes, check if user is authenticated ONLY when needed
        if (requiresAuth(cleanPath) && !token) {
          return false;
        }

        // Check role-based access for admin routes
        const requiredRoles = getRequiredRoles(cleanPath);
        if (requiredRoles.length > 0) {
          return requiredRoles.includes(token?.role as string);
        }

        // For other routes that don't require auth, allow access
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    // Skip internal/static paths and public assets (including models and any file with an extension)
    '/((?!_next/static|_next/image|favicon.ico|assets/|models/|.*\\..*).*)',
    // Always run for API routes
    '/api/(.*)',
  ],
};
