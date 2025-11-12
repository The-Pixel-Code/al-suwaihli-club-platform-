// src/hooks/use-auth.ts

import { useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    role: session?.user?.role,
  };
};

// Role checking helper
export const useRole = (allowedRoles: string[]) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user?.role) {
    return false;
  }

  return allowedRoles.includes(user.role);
};
