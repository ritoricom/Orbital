import { useQuery } from "@tanstack/react-query";

import { getSearch } from "../api/get-search";

const getQueryKey = (search, lang) => [
  "search",
  {
    search: search,
    lang: lang,
  },
];

const getQueryFn = (search, lang) => () =>
  getSearch({
    search,
    lang,
  });

export const useSearch = ({ search, lang, queryConfig = {} }) =>
  useQuery({
    ...queryConfig,
    queryKey: getQueryKey(search, lang),
    queryFn: getQueryFn(search, lang),
  });
