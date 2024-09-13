import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { noopFn } from "@/utils/noop";
import { mapNullable } from "@/utils/fp";
import { Nullable } from "@/types/utility";
import { City, CityDto, toCityDto } from "@/features/misc";
import { toUserRoleDto, UserRoleDto } from "./dto/user-role-dto";
import { UserRole } from "../types/user-role";
import { throwErrorCtx } from "@/lib/error-ctx";

export interface CreateUserPayload {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  city?: City;
}

interface CreateUserBodyDto {
  fullName: string;
  email: string;
  password: string;
  role: UserRoleDto;
  city: Nullable<CityDto>;
}

const toCreateUserBodyDto = (
  payload: CreateUserPayload
): CreateUserBodyDto => ({
  fullName: payload.fullName,
  email: payload.email,
  password: payload.password,
  role: toUserRoleDto(payload.role),
  city: mapNullable(toCityDto)(payload.city),
});

export const createUser = async (payload: CreateUserPayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/users`, {
    method: "POST",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toCreateUserBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при добавлении пользователя"));
