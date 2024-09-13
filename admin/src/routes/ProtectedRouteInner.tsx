import { FC, ReactNode } from "react";
import { ForbiddenError } from "@/errors";
import { useAuthorization } from "@/lib/authorization";
import { City } from "@/features/misc";
import { UserRole } from "@/features/users";

export interface ProtectedRouteInnerProps {
  allowedRoles: UserRole[];
  allowedManagerCities?: City[];
  children: ReactNode;
}

export const ProtectedRouteInner: FC<ProtectedRouteInnerProps> = ({
  allowedRoles,
  allowedManagerCities,
  children,
}) => {
  const { checkAccess } = useAuthorization();

  const accessed = checkAccess({ allowedRoles, allowedManagerCities });
  if (!accessed) {
    throw new ForbiddenError();
  }

  return <>{children}</>;
};
