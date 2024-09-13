import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";

export interface DeleteNewsPayload {
  newsID: string;
}

export const deleteNews = (payload: DeleteNewsPayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/news/${payload.newsID}`, {
    method: "DELETE",
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при удалении новости"));
