import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { noopFn } from "@/utils/noop";
import { City, CityDto, toCityDto } from "@/features/misc";
import { throwErrorCtx } from "@/lib/error-ctx";

export interface AddHotelImagePayload {
  city: City;
  imageID: string;
}

interface AddHotelImageBodyDto {
  city: CityDto;
  imageId: string;
}

const toAddHotelImageBodyDto = (
  payload: AddHotelImagePayload
): AddHotelImageBodyDto => ({
  city: toCityDto(payload.city),
  imageId: payload.imageID,
});

export const addHotelImage = (payload: AddHotelImagePayload) =>
  fetch(`${API_URL}/api/admin/hotel/images`, {
    method: "POST",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toAddHotelImageBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при добавлении фотографии отеля"));
