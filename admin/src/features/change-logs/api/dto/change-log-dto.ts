import { fromUserDto, UserDto } from "@/features/users";
import { Nullable } from "@/types/utility";
import { mapNullable } from "@/utils/fp";
import { ChangeLog } from "../../types/change-log";

export interface ChangeLogDto {
  message: string;
  author: Nullable<UserDto>;
  createdAt: string;
}

export const fromChangeLogDto = (dto: ChangeLogDto): ChangeLog => ({
  message: dto.message,
  author: mapNullable(fromUserDto)(dto.author),
  createdAt: new Date(dto.createdAt),
});
