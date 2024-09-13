import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { getLeisure } from "../api/get-leisure";
import { Leisure } from "../types/leisure";

export interface UseLeisureOptions {
  leisureID: string;
  queryConfig?: QueryConfig<Leisure>;
}

export const useLeisure = (
  options: UseLeisureOptions
): UseQueryReturn<Leisure> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "leisure",
      {
        leisureID: options.leisureID,
      },
    ],
    queryFn: () =>
      getLeisure({
        leisureID: options.leisureID,
      }),
  });
