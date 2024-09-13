import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";

export interface ChangeUserPasswordPayload {
  userID: string;
  password: string;
}

interface ChangeUserPasswordBodyDto {
  password: string;
}

const toChangeUserPasswordBodyDto = (
  payload: ChangeUserPasswordPayload
): ChangeUserPasswordBodyDto => ({
  password: payload.password,
});

export const changeUserPassword = (
  payload: ChangeUserPasswordPayload
): Promise<void> =>
  fetch(`${API_URL}/api/admin/users/${payload.userID}/password`, {
    method: "PATCH",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toChangeUserPasswordBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при изменении пароля пользователя"));
