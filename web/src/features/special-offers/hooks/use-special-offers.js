import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { getNextPageParamFromPaginated } from "@/lib/react-query";
import { getOr } from "@/utils/fp";
import {
  getSpecialOffers,
  SPECIAL_OFFERS_PAGE_SIZE,
} from "@/features/special-offers";

const getQueryKey = ({ city, lang, pageSize }) => [
  "specialOffers",
  {
    city: city,
    lang: lang,
    pageSize: pageSize,
  },
];

const getQueryFn =
  ({ lang, pageSize }) =>
  ({ pageParam }) =>
    getSpecialOffers({
      lang,
      page: getOr(0)(pageParam),
      pageSize: pageSize,
    });

export const prefetchSpecialOffers = async ({
  lang,
  pageSize = SPECIAL_OFFERS_PAGE_SIZE,
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: getQueryKey({
      lang,
      pageSize,
    }),
    queryFn: getQueryFn({
      lang,
      pageSize,
    }),
  });

  return queryClient;
};

export const useSpecialOffers = ({
  lang,
  pageSize = SPECIAL_OFFERS_PAGE_SIZE,
  queryConfig = {},
}) =>
  useInfiniteQuery({
    ...queryConfig,
    queryKey: getQueryKey({
      lang,
      pageSize,
    }),
    queryFn: getQueryFn({
      lang,
      pageSize,
    }),
    getNextPageParam: getNextPageParamFromPaginated(pageSize),
  });
