import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";

export interface DeleteHotelImagePayload {
  imageID: string;
}

export const deleteHotelImage = (
  payload: DeleteHotelImagePayload
): Promise<void> =>
  fetch(`${API_URL}/api/admin/hotel/images/${payload.imageID}`, {
    method: "POST",
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при удалении фотографии отеля"));
