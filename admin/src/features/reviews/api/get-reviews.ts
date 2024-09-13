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
import { fromReviewDto } from "./dto/review-dto";
import { Review } from "../types/review";

export interface GetReviewsPayload {
  city: City;
  search: string;
  sorting: Sorting;
  pagination: Pagination;
}

export const toGetReviewsParams = (
  payload: GetReviewsPayload
): URLSearchParams =>
  new URLSearchParams({
    city: toCityDto(payload.city),
    ...(payload.search !== "" && {
      search: payload.search,
    }),
    ...toSortingDto(payload.sorting),
    ...toPaginationDto(payload.pagination),
  });

export const getReviews = (
  payload: GetReviewsPayload
): Promise<Paginated<Review>> =>
  fetch(`${API_URL}/api/admin/reviews?${toGetReviewsParams(payload)}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(mapFromPaginatedDto(fromReviewDto));
