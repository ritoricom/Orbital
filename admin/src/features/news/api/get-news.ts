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
import { isNonNullable } from "@/utils/eq";
import { toNewsCityDto } from "./dto/news-city-dto";
import { fromNewsDto } from "./dto/news-dto";
import { NewsCity } from "../types/news-city";
import { News } from "../types/news";

export interface GetNewsPayload {
  city: NewsCity;
  search: string;
  sorting: Sorting;
  pagination: Pagination;
}

export const toGetNewsParams = (payload: GetNewsPayload): URLSearchParams => {
  const newsCityDto = toNewsCityDto(payload.city);

  return new URLSearchParams({
    ...(isNonNullable(newsCityDto) && {
      city: newsCityDto,
    }),
    ...(payload.search !== "" && {
      search: payload.search,
    }),
    ...toSortingDto(payload.sorting),
    ...toPaginationDto(payload.pagination),
  });
};

export const getNews = (payload: GetNewsPayload): Promise<Paginated<News>> =>
  fetch(`${API_URL}/api/admin/news?${toGetNewsParams(payload)}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(mapFromPaginatedDto(fromNewsDto));
