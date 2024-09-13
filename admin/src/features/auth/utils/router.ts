import { UserRole } from "@/features/users";

export const getDefaultRouteByRole = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "/users";
    case "manager":
      return "/rooms";
    default:
      throw new Error(`unhandled role: ${role}`);
  }
};
