import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { getSpecialOffer } from "../api/get-special-offer";
import { SpecialOffer } from "../types/special-offer";

export interface UseSpecialOfferOptions {
  specialOfferID: string;
  queryConfig?: QueryConfig<SpecialOffer>;
}

export const useSpecialOffer = (
  options: UseSpecialOfferOptions
): UseQueryReturn<SpecialOffer> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "special-offer",
      {
        specialOfferID: options.specialOfferID,
      },
    ],
    queryFn: () =>
      getSpecialOffer({
        specialOfferID: options.specialOfferID,
      }),
  });
