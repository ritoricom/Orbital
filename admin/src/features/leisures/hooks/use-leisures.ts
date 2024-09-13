import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { Sorting } from "@/lib/sorting";
import { Pagination } from "@/lib/pagination";
import { Paginated } from "@/types/paginated";
import { getLeisures } from "../api/get-leisures";
import { Leisure } from "../types/leisure";

export interface UseLeisuresOptions {
  search: string;
  sorting: Sorting;
  pagination: Pagination;
  queryConfig?: QueryConfig<Paginated<Leisure>>;
}

export const useLeisures = (
  options: UseLeisuresOptions
): UseQueryReturn<Paginated<Leisure>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "leisures",
      {
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      },
    ],
    queryFn: () =>
      getLeisures({
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      }),
  });
