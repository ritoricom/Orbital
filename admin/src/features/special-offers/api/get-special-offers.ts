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
import { SpecialOffer } from "../types/special-offer";
import { fromSpecialOfferDto } from "./dto/special-offer-dto";

export interface GetSpecialOffersPayload {
  search: string;
  sorting: Sorting;
  pagination: Pagination;
}

export const toGetSpecialOffersParams = (
  payload: GetSpecialOffersPayload
): URLSearchParams =>
  new URLSearchParams({
    ...(payload.search !== "" && {
      search: payload.search,
    }),
    ...toSortingDto(payload.sorting),
    ...toPaginationDto(payload.pagination),
  });

export const getSpecialOffers = (
  payload: GetSpecialOffersPayload
): Promise<Paginated<SpecialOffer>> =>
  fetch(
    `${API_URL}/api/admin/special-offers?${toGetSpecialOffersParams(payload)}`,
    {
      headers: getBearerAuthHeader(),
    }
  )
    .then(checkSuccess)
    .then((response) => response.json())
    .then(mapFromPaginatedDto(fromSpecialOfferDto));
