import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { fromUserDto, User } from "@/features/users";

export const loadUser = (): Promise<User> =>
  fetch(`${API_URL}/api/admin/auth/me`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromUserDto);
