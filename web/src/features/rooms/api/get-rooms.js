import { mapToPaginated } from "@/lib/api";
import { API_URL } from "@/config/api";
import { mapFromRoomDto } from "@/features/rooms";
import { checkSuccess } from "@/utils/check-success";

const mapToGetRoomsParamsDto = ({ city, lang, page, pageSize }) =>
  new URLSearchParams({
    city: city,
    language: lang,
    page: page,
    pageSize: pageSize,
  }).toString();

export const getRooms = ({ city, lang, page, pageSize }) =>
  fetch(
    `${API_URL}/api/rooms?${mapToGetRoomsParamsDto({
      city,
      lang,
      page,
      pageSize,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapToPaginated(mapFromRoomDto));
