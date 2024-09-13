import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { Sorting } from "@/lib/sorting";
import { Pagination } from "@/lib/pagination";
import { Paginated } from "@/types/paginated";
import { City } from "@/features/misc";
import { getReviews } from "../api/get-reviews";
import { Review } from "../types/review";

export interface UseReviewsOptions {
  city: City;
  search: string;
  sorting: Sorting;
  pagination: Pagination;
  queryConfig?: QueryConfig<Paginated<Review>>;
}

export const useReviews = (
  options: UseReviewsOptions
): UseQueryReturn<Paginated<Review>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "reviews",
      {
        city: options.city,
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      },
    ],
    queryFn: () =>
      getReviews({
        city: options.city,
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      }),
  });
