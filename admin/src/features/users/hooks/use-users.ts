import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { Sorting } from "@/lib/sorting";
import { Pagination } from "@/lib/pagination";
import { Paginated } from "@/types/paginated";
import { getUsers, User } from "@/features/users";

export interface UseUsersOptions {
  search: string;
  sorting: Sorting;
  pagination: Pagination;
  queryConfig?: QueryConfig<Paginated<User>>;
}

export const useUsers = (
  options: UseUsersOptions
): UseQueryReturn<Paginated<User>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "users",
      {
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      },
    ],
    queryFn: () =>
      getUsers({
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      }),
  });
