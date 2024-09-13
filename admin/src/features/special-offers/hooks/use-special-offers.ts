import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { Sorting } from "@/lib/sorting";
import { Pagination } from "@/lib/pagination";
import { Paginated } from "@/types/paginated";
import { getSpecialOffers } from "../api/get-special-offers";
import { SpecialOffer } from "../types/special-offer";

export interface UseSpecialOffersOptions {
  search: string;
  sorting: Sorting;
  pagination: Pagination;
  queryConfig?: QueryConfig<Paginated<SpecialOffer>>;
}

export const useSpecialOffers = (
  options: UseSpecialOffersOptions
): UseQueryReturn<Paginated<SpecialOffer>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "special-offers",
      {
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      },
    ],
    queryFn: () =>
      getSpecialOffers({
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      }),
  });
