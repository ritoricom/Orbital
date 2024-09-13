import { City } from "@/features/misc";
import type { User, UserRole } from "@/features/users";

export interface CheckAccessOptions {
  allowedRoles: UserRole[];
  allowedManagerCities?: City[];
}

export const checkAccess = (
  user: User,
  {
    allowedRoles,
    allowedManagerCities = ["spb", "obn", "nvz"],
  }: CheckAccessOptions
): boolean =>
  allowedRoles.includes(user.role) &&
  (user.role === "manager"
    ? allowedManagerCities.includes(user.city as City)
    : true);
