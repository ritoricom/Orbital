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
import { City, toCityDto } from "@/features/misc";
import { fromNewsletterDto } from "./dto/newsletter-dto";
import { Newsletter } from "../types/newsletter";

export interface GetNewslettersPayload {
  city: City;
  search: string;
  sorting: Sorting;
  pagination: Pagination;
}

export const toGetNewslettersParams = (
  payload: GetNewslettersPayload
): URLSearchParams =>
  new URLSearchParams({
    city: toCityDto(payload.city),
    ...(payload.search !== "" && {
      search: payload.search,
    }),
    ...toSortingDto(payload.sorting),
    ...toPaginationDto(payload.pagination),
  });

export const getNewsletters = (
  payload: GetNewslettersPayload
): Promise<Paginated<Newsletter>> =>
  fetch(`${API_URL}/api/admin/newsletters?${toGetNewslettersParams(payload)}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(mapFromPaginatedDto(fromNewsletterDto));
