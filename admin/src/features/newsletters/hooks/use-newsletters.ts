import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { Sorting } from "@/lib/sorting";
import { Pagination } from "@/lib/pagination";
import { Paginated } from "@/types/paginated";
import { City } from "@/features/misc";
import { getNewsletters } from "../api/get-newsletters";
import { Newsletter } from "../types/newsletter";

export interface UseNewslettersOptions {
  city: City;
  search: string;
  sorting: Sorting;
  pagination: Pagination;
  queryConfig?: QueryConfig<Paginated<Newsletter>>;
}

export const useNewsletters = (
  options: UseNewslettersOptions
): UseQueryReturn<Paginated<Newsletter>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "newsletters",
      {
        city: options.city,
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      },
    ],
    queryFn: () =>
      getNewsletters({
        city: options.city,
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      }),
  });
