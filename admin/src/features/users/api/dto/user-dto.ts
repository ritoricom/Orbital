import { Nullable } from "@/types/utility";
import { mapNullable } from "@/utils/fp";
import { CityDto, fromCityDto } from "@/features/misc";
import { fromUserRoleDto, User, UserRoleDto } from "@/features/users";

export interface UserDto {
  id: string;
  fullName: string;
  email: string;
  role: UserRoleDto;
  city: Nullable<CityDto>;
}

export const fromUserDto = (dto: UserDto): User => ({
  id: dto.id,
  fullName: dto.fullName,
  email: dto.email,
  role: fromUserRoleDto(dto.role),
  city: mapNullable(fromCityDto)(dto.city),
});
