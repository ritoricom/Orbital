import { API_URL } from "@/config/api";
import { getBearerAuthHeader, checkSuccess } from "@/lib/api";
import { fromReviewDto } from "./dto/review-dto";
import { Review } from "../types/review";

export interface GetReviewPayload {
  reviewID: string;
}

export const getReview = (payload: GetReviewPayload): Promise<Review> =>
  fetch(`${API_URL}/api/admin/reviews/${payload.reviewID}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromReviewDto);
