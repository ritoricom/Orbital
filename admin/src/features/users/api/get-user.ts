import { API_URL } from "@/config/api";
import { getBearerAuthHeader, checkSuccess } from "@/lib/api";
import { fromUserDto, User } from "@/features/users";

export interface GetUserPayload {
  userID: string;
}

export const getUser = (payload: GetUserPayload): Promise<User> =>
  fetch(`${API_URL}/api/admin/users/${payload.userID}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromUserDto);
