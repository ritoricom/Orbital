import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";
import {
  City,
  CityDto,
  LangRecord,
  LangRecordDto,
  toCityDto,
  toLangRecordDto,
} from "@/features/misc";

export interface UpdateReviewPayload {
  reviewID: string;
  headers: LangRecord<string>;
  descriptions: LangRecord<string>;
  authors: LangRecord<string>;
  city: City;
  publishedAt: Date;
  grade: number;
}

interface UpdateReviewBodyDto {
  headers: LangRecordDto<string>;
  descriptions: LangRecordDto<string>;
  authors: LangRecordDto<string>;
  city: CityDto;
  publishedAt: string;
  grade: number;
}

const toUpdateReviewBodyDto = (
  payload: UpdateReviewPayload
): UpdateReviewBodyDto => ({
  headers: toLangRecordDto(payload.headers),
  descriptions: toLangRecordDto(payload.descriptions),
  authors: toLangRecordDto(payload.authors),
  city: toCityDto(payload.city),
  publishedAt: payload.publishedAt.toISOString(),
  grade: payload.grade,
});

export const updateReview = (payload: UpdateReviewPayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/reviews/${payload.reviewID}`, {
    method: "PUT",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toUpdateReviewBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при изменении отзыва"));
