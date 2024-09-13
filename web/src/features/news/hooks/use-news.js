import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { getNextPageParamFromPaginated } from "@/lib/react-query";
import { getOr } from "@/utils/fp";
import { getNews, NEWS_PAGE_SIZE } from "@/features/news";

const getQueryKey = ({ city, lang, pageSize }) => [
  "news",
  {
    city: city,
    lang: lang,
    pageSize: pageSize,
  },
];

const getQueryFn =
  ({ city, lang, pageSize }) =>
  ({ pageParam }) =>
    getNews({
      city,
      lang,
      page: getOr(0)(pageParam),
      pageSize: pageSize,
    });

export const prefetchNews = async ({
  city,
  lang,
  pageSize = NEWS_PAGE_SIZE,
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

export const useNews = ({
  city,
  lang,
  pageSize = NEWS_PAGE_SIZE,
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
