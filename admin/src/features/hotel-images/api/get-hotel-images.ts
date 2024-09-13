import { API_URL } from "@/config/api";
import { checkSuccess, mapFromPaginatedDto } from "@/lib/api";
import { Paginated } from "@/types/paginated";
import { City, toCityDto } from "@/features/misc";
import { fromImageDto, Image } from "@/features/images";

export interface GetHotelImages {
  city: City;
}

export const toGetNewsParams = (payload: GetHotelImages): URLSearchParams =>
  new URLSearchParams({
    city: toCityDto(payload.city),
  });

export const getHotelImages = (
  payload: GetHotelImages
): Promise<Paginated<Image>> =>
  fetch(`${API_URL}/api/hotel/images?${toGetNewsParams(payload)}`)
    .then(checkSuccess)
    .then((response) => response.json())
    .then(mapFromPaginatedDto(fromImageDto));
