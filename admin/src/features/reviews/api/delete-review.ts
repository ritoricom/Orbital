import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";

export interface DeleteReviewPayload {
  reviewID: string;
}

export const deleteReview = (payload: DeleteReviewPayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/reviews/${payload.reviewID}`, {
    method: "DELETE",
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при удалении отзыва"));
