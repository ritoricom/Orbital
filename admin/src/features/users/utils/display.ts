import { UserRole } from "../types/user-role";

export const displayUserRole = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "Администратор";
    case "manager":
      return "Менеджер";
  }
};
