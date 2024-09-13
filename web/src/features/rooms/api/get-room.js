import { API_URL } from "@/config/api";
import { mapFromRoomDto } from "@/features/rooms";
import { checkSuccess } from "@/utils/check-success";

const mapToGetRoomParamsDto = ({ lang }) =>
  new URLSearchParams({
    language: lang,
  }).toString();

export const getRoom = ({ roomID, lang }) =>
  fetch(
    `${API_URL}/api/rooms/${roomID}?${mapToGetRoomParamsDto({
      lang,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapFromRoomDto);
