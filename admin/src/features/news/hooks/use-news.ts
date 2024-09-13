import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { Sorting } from "@/lib/sorting";
import { Pagination } from "@/lib/pagination";
import { Paginated } from "@/types/paginated";
import { getNews } from "../api/get-news";
import { NewsCity } from "../types/news-city";
import { News } from "../types/news";

export interface UseNewsOptions {
  city: NewsCity;
  search: string;
  sorting: Sorting;
  pagination: Pagination;
  queryConfig?: QueryConfig<Paginated<News>>;
}

export const useNews = (
  options: UseNewsOptions
): UseQueryReturn<Paginated<News>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "news",
      {
        city: options.city,
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      },
    ],
    queryFn: () =>
      getNews({
        city: options.city,
        search: options.search,
        sorting: options.sorting,
        pagination: options.pagination,
      }),
  });
