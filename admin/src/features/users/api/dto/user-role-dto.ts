import { UserRole } from "@/features/users";

export type UserRoleDto = UserRole;

export const fromUserRoleDto = (dto: UserRoleDto): UserRole => dto;

export const toUserRoleDto = (role: UserRole): UserRoleDto => role;
