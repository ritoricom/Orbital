import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";
import { mapNullable } from "@/utils/fp";
import { Nullable } from "@/types/utility";
import { City, CityDto, toCityDto } from "@/features/misc";
import { UserRole, UserRoleDto, toUserRoleDto } from "@/features/users";

export interface UpdateUserPayload {
  userID: string;
  fullName: string;
  email: string;
  role: UserRole;
  city?: City;
}

interface UpdateUserBodyDto {
  fullName: string;
  email: string;
  role: UserRoleDto;
  city: Nullable<CityDto>;
}

const toUpdateUserBodyDto = (
  payload: UpdateUserPayload
): UpdateUserBodyDto => ({
  fullName: payload.fullName,
  email: payload.email,
  role: toUserRoleDto(payload.role),
  city: mapNullable(toCityDto)(payload.city),
});

export const updateUser = async (payload: UpdateUserPayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/users/${payload.userID}`, {
    method: "PUT",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toUpdateUserBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при изменении пользователя"));
