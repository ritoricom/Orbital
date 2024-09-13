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
import { fromChangeLogDto } from "./dto/change-log-dto";
import { ChangeLog } from "../types/change-log";

export interface GetChangeLogsPayload {
  search: string;
  sorting: Sorting;
  pagination: Pagination;
}

export const toGetChangeLogsParams = (
  payload: GetChangeLogsPayload
): URLSearchParams =>
  new URLSearchParams({
    ...(payload.search !== "" && {
      search: payload.search,
    }),
    ...toSortingDto(payload.sorting),
    ...toPaginationDto(payload.pagination),
  });

export const getChangeLogs = (
  payload: GetChangeLogsPayload
): Promise<Paginated<ChangeLog>> =>
  fetch(`${API_URL}/api/admin/change-logs?${toGetChangeLogsParams(payload)}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(mapFromPaginatedDto(fromChangeLogDto));
