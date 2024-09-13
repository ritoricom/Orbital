import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { Paginated } from "@/types/paginated";
import { City } from "@/features/misc";
import { Image } from "@/features/images";
import { getHotelImages } from "../api/get-hotel-images";

export interface UseHotelImagesOptions {
  city: City;
  queryConfig?: QueryConfig<Paginated<Image>>;
}

export const useHotelImages = (
  options: UseHotelImagesOptions
): UseQueryReturn<Paginated<Image>> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "hotel-images",
      {
        city: options.city,
      },
    ],
    queryFn: () =>
      getHotelImages({
        city: options.city,
      }),
  });
