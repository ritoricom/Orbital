import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";

export interface UpdateRoomCoverPayload {
  roomID: string;
  imageID: string;
}

interface UpdateRoomCoverBodyDto {
  coverId: string;
}

const toUpdateRoomCoverBodyDto = (
  payload: UpdateRoomCoverPayload
): UpdateRoomCoverBodyDto => ({
  coverId: payload.imageID,
});

export const updateRoomCover = (payload: UpdateRoomCoverPayload) =>
  fetch(`${API_URL}/api/admin/rooms/${payload.roomID}/cover`, {
    method: "PATCH",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toUpdateRoomCoverBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при обновлении обложки номера"));
