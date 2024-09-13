import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";

export interface DeleteSpecialOfferPayload {
  specialOfferID: string;
}

export const deleteSpecialOffer = (
  payload: DeleteSpecialOfferPayload
): Promise<void> =>
  fetch(`${API_URL}/api/admin/special-offers/${payload.specialOfferID}`, {
    method: "DELETE",
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при удалении спецпредложения"));
