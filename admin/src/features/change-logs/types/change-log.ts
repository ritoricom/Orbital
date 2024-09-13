import { Nullable } from "@/types/utility";
import { User } from "@/features/users";

export type ChangeLog = {
  message: string;
  author: Nullable<User>;
  createdAt: Date;
};
