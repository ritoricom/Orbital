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
import { toCityDto, City } from "@/features/misc";
import { fromRoomDto, Room } from "@/features/rooms";

export interface GetRoomsPayload {
  search: string;
  city: City;
  sorting: Sorting;
  pagination: Pagination;
}

export const toGetRoomsParams = (payload: GetRoomsPayload): URLSearchParams =>
  new URLSearchParams({
    city: toCityDto(payload.city),
    ...(payload.search !== "" && {
      search: payload.search,
    }),
    ...toSortingDto(payload.sorting),
    ...toPaginationDto(payload.pagination),
  });

export const getRooms = (payload: GetRoomsPayload): Promise<Paginated<Room>> =>
  fetch(`${API_URL}/api/admin/rooms?${toGetRoomsParams(payload)}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(mapFromPaginatedDto(fromRoomDto));
