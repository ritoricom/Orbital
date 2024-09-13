import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { getNextPageParamFromPaginated } from "@/lib/react-query";
import { getOr } from "@/utils/fp";
import { getRooms, ROOMS_PAGE_SIZE } from "@/features/rooms";

const getQueryKey = ({ city, lang, pageSize }) => [
  "rooms",
  {
    city: city,
    lang: lang,
    pageSize: pageSize,
  },
];

const getQueryFn =
  ({ city, lang, pageSize }) =>
  ({ pageParam }) =>
    getRooms({
      city,
      lang,
      page: getOr(0)(pageParam),
      pageSize: pageSize,
    });

export const prefetchRooms = async ({
  city,
  lang,
  pageSize = ROOMS_PAGE_SIZE,
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: getQueryKey({
      city,
      lang,
      pageSize,
    }),
    queryFn: getQueryFn({
      city,
      lang,
      pageSize,
    }),
  });

  return queryClient;
};

export const useRooms = ({
  city,
  lang,
  pageSize = ROOMS_PAGE_SIZE,
  queryConfig = {},
}) =>
  useInfiniteQuery({
    ...queryConfig,
    queryKey: getQueryKey({
      city,
      lang,
      pageSize,
    }),
    queryFn: getQueryFn({
      city,
      lang,
      pageSize,
    }),
    getNextPageParam: getNextPageParamFromPaginated(pageSize),
  });
