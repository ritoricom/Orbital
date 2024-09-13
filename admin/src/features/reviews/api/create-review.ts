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

export interface CreateReviewPayload {
  headers: LangRecord<string>;
  descriptions: LangRecord<string>;
  authors: LangRecord<string>;
  city: City;
  publishedAt: Date;
  grade: number;
}

interface CreateReviewBodyDto {
  headers: LangRecordDto<string>;
  descriptions: LangRecordDto<string>;
  authors: LangRecordDto<string>;
  city: CityDto;
  publishedAt: string;
  grade: number;
}

const toCreateReviewBodyDto = (
  payload: CreateReviewPayload
): CreateReviewBodyDto => ({
  headers: toLangRecordDto(payload.headers),
  descriptions: toLangRecordDto(payload.descriptions),
  authors: toLangRecordDto(payload.authors),
  city: toCityDto(payload.city),
  publishedAt: payload.publishedAt.toISOString(),
  grade: payload.grade,
});

export const createReview = (payload: CreateReviewPayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/reviews`, {
    method: "POST",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toCreateReviewBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при добавлении отзыва"));
