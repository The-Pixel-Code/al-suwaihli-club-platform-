// Helper hook for route access control
// src/hooks/use-route-access.ts
import { useAuth } from "./use-auth";
import { getRequiredRoles, isPublicRoute } from "@/routes";
import { usePathname } from "next/navigation";

export const useRouteAccess = () => {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const checkAccess = (path?: string): boolean => {
    const targetPath = path || pathname;
    
    // Public routes are always accessible
    if (isPublicRoute(targetPath)) {
      return true;
    }

    // Require authentication for protected routes
    if (!isAuthenticated) {
      return false;
    }

    // Check role-based access
    const requiredRoles = getRequiredRoles(targetPath);
    if (requiredRoles.length > 0) {
      return user?.role ? requiredRoles.includes(user.role) : false;
    }

    return true;
  };

  const getAccessLevel = () => {
    if (!isAuthenticated) return "GUEST";
    return user?.role || "MEMBER";
  };

  return {
    hasAccess: checkAccess(),
    checkAccess,
    accessLevel: getAccessLevel(),
    canAccess: (path: string) => checkAccess(path),
  };
};