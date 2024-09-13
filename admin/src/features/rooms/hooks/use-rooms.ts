import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { Sorting } from "@/lib/sorting";
import { Pagination } from "@/lib/pagination";
import { Paginated } from "@/types/paginated";
import { City } from "@/features/misc";
import { getRooms, Room } from "@/features/rooms";

export interface UseRoomsOptions {
  search: string;
  city: City;
  sorting: Sorting;
  pagination: Pagination;
  queryConfig?: QueryConfig<Paginated<Room>>;
}

export const useRooms = (
  options: UseRoomsOptions
): UseQueryReturn<Paginated<Room>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "rooms",
      {
        city: options.city,
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      },
    ],
    queryFn: () =>
      getRooms({
        city: options.city,
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      }),
  });
