import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { getNewsArticle } from "../api/get-news-article";
import { News } from "../types/news";

export interface UseNewsArticleOptions {
  newsID: string;
  queryConfig?: QueryConfig<News>;
}

export const useNewsArticle = (
  options: UseNewsArticleOptions
): UseQueryReturn<News> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "news-article",
      {
        newsID: options.newsID,
      },
    ],
    queryFn: () =>
      getNewsArticle({
        newsID: options.newsID,
      }),
  });
