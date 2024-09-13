import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { getNextPageParamFromPaginated } from "@/lib/react-query";
import { getLeisures, LEISURE_PAGE_SIZE } from "@/features/leisures";
import { getOr } from "@/utils/fp";

const getQueryKey = (pageSize = LEISURE_PAGE_SIZE) => [
  "leisures",
  {
    pageSize: pageSize,
  },
];

const getQueryFn =
  (pageSize = LEISURE_PAGE_SIZE) =>
  ({ pageParam }) =>
    getLeisures({
      page: getOr(0)(pageParam),
      pageSize: pageSize,
    });

export const prefetchLeisures = async (pageSize = LEISURE_PAGE_SIZE) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: getQueryKey(pageSize),
    queryFn: getQueryFn(pageSize),
  });

  return queryClient;
};

export const useLeisures = (
  { pageSize, queryConfig } = { pageSize: LEISURE_PAGE_SIZE, queryConfig: {} }
) =>
  useInfiniteQuery({
    ...queryConfig,
    queryKey: getQueryKey(pageSize),
    queryFn: getQueryFn(pageSize),
    getNextPageParam: getNextPageParamFromPaginated(pageSize),
  });
