import { API_URL } from "@/config/api";
import { mapFromImageDto } from "@/features/images";
import { mapToPaginated } from "@/lib/api";
import { checkSuccess } from "@/utils/check-success";

const mapToGetHotelImagesParamsDto = ({ city }) =>
  new URLSearchParams({
    city: city,
  }).toString();

export const getHotelImages = ({ city }) =>
  fetch(
    `${API_URL}/api/hotel/images?${mapToGetHotelImagesParamsDto({
      city,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapToPaginated(mapFromImageDto));
