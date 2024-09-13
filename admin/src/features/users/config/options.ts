import { SelectOptions } from "@/types/select";
import { createOptionsByDisplay } from "@/utils/select";
import { UserRole } from "../types/user-role";
import { displayUserRole } from "../utils/display";

export const roleOptions: SelectOptions<UserRole> = createOptionsByDisplay(
  displayUserRole
)(["admin", "manager"]);
