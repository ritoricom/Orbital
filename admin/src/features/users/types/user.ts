import { Nullable } from "@/types/utility";
import { City } from "@/features/misc";
import { UserRole } from "@/features/users";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  city: Nullable<City>;
};
