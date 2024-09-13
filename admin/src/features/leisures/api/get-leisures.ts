import { API_URL } from "@/config/api";
import {
  getBearerAuthHeader,
  toPaginationDto,
  toSortingDto,
  mapFromPaginatedDto,
  checkSuccess,
} from "@/lib/api";
import { Sorting } from "@/lib/sorting";
import { Pagination } from "@/lib/pagination";
import { Paginated } from "@/types/paginated";
import { fromLeisureDto } from "./dto/leisure-dto";
import { Leisure } from "../types/leisure";

export interface GetLeisuresPayload {
  search: string;
  sorting: Sorting;
  pagination: Pagination;
}

export const toGetLeisuresParams = (
  payload: GetLeisuresPayload
): URLSearchParams =>
  new URLSearchParams({
    ...(payload.search !== "" && {
      search: payload.search,
    }),
    ...toSortingDto(payload.sorting),
    ...toPaginationDto(payload.pagination),
  });

export const getLeisures = (
  payload: GetLeisuresPayload
): Promise<Paginated<Leisure>> =>
  fetch(`${API_URL}/api/admin/leisures?${toGetLeisuresParams(payload)}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(mapFromPaginatedDto(fromLeisureDto));
