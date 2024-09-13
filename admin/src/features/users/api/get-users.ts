import { API_URL } from "@/config/api";
import {
  getBearerAuthHeader,
  toPaginationDto,
  toSortingDto,
  mapFromPaginatedDto,
  checkSuccess,
} from "@/lib/api";
import { Sorting } from "@/lib/sorting";
import { Paginated } from "@/types/paginated";
import { Pagination } from "@/lib/pagination";
import { fromUserDto, User } from "@/features/users";

export interface GetUsersPayload {
  search: string;
  sorting: Sorting;
  pagination: Pagination;
}

export const toGetUsersParams = (payload: GetUsersPayload): URLSearchParams =>
  new URLSearchParams({
    ...(payload.search !== "" && {
      search: payload.search,
    }),
    ...toSortingDto(payload.sorting),
    ...toPaginationDto(payload.pagination),
  });

export const getUsers = (payload: GetUsersPayload): Promise<Paginated<User>> =>
  fetch(`${API_URL}/api/admin/users?${toGetUsersParams(payload)}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(mapFromPaginatedDto(fromUserDto));
