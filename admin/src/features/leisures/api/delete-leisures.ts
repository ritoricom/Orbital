import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";

export interface DeleteLeisurePayload {
  leisureID: string;
}

export const deleteLeisure = (payload: DeleteLeisurePayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/leisures/${payload.leisureID}`, {
    method: "DELETE",
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при удалении досуга"));
