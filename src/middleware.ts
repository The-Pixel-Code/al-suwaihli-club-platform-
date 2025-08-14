// Update src/middleware.ts

import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (req.nextUrl.pathname.startsWith('/api/auth')) return true;
        if (req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/en') || req.nextUrl.pathname.startsWith('/ar')) {
          // Check if it's a public route
          const isPublicRoute = ['/'].some(route => 
            req.nextUrl.pathname.endsWith(route)
          );
          if (isPublicRoute) return true;
        }

        // Protect admin routes
        if (req.nextUrl.pathname.includes('/admin')) {
          return token?.role === 'ADMIN' || token?.role === 'SUPER_ADMIN';
        }

        // For other protected routes, just check if user is authenticated
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/admin/:path*"
  ],
};