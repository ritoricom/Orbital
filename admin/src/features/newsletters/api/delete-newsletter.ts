import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";

export interface DeleteNewsletterPayload {
  newsletterID: string;
}

export const deleteNewsletter = (
  payload: DeleteNewsletterPayload
): Promise<void> =>
  fetch(`${API_URL}/api/admin/newsletters/${payload.newsletterID}`, {
    method: "DELETE",
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при удалении рассылки"));
