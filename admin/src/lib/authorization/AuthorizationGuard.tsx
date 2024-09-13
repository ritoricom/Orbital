import { FC, ReactNode } from "react";

import { City } from "@/features/misc";
import { UserRole } from "@/features/users";
import { useAuthorization } from "./use-authorization";

export interface AuthorizationGuardProps {
  allowedRoles: UserRole[];
  allowedManagerCities?: City[];
  fallback?: ReactNode;
  children: ReactNode;
}

export const AuthorizationGuard: FC<AuthorizationGuardProps> = ({
  allowedRoles,
  allowedManagerCities,
  fallback = null,
  children,
}) => {
  const { checkAccess } = useAuthorization();

  const accessed = checkAccess({ allowedRoles, allowedManagerCities });
  if (!accessed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
