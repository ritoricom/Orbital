import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { Sorting } from "@/lib/sorting";
import { Pagination } from "@/lib/pagination";
import { Paginated } from "@/types/paginated";
import { getChangeLogs } from "../api/get-change-logs";
import { ChangeLog } from "../types/change-log";

export interface UseChangeLogsOptions {
  search: string;
  sorting: Sorting;
  pagination: Pagination;
  queryConfig?: QueryConfig<Paginated<ChangeLog>>;
}

export const useChangeLogs = (
  options: UseChangeLogsOptions
): UseQueryReturn<Paginated<ChangeLog>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "change-logs",
      {
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      },
    ],
    queryFn: () =>
      getChangeLogs({
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      }),
  });
