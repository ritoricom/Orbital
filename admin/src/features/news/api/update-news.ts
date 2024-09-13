import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { noopFn } from "@/utils/noop";
import { Image } from "@/features/images";
import { LangRecord, LangRecordDto, toLangRecordDto } from "@/features/misc";
import { NewsCityDto, toNewsCityDto } from "./dto/news-city-dto";
import { NewsCity } from "../types/news-city";
import { throwErrorCtx } from "@/lib/error-ctx";

export interface UpdateNewsPayload {
  newsID: string;
  titles: LangRecord<string>;
  descriptions: LangRecord<string>;
  city: NewsCity;
  publishedAt: Date;
  cover: Image;
  images: Image[];
}

interface UpdateNewsBodyDto {
  titles: LangRecordDto<string>;
  descriptions: LangRecordDto<string>;
  city: NewsCityDto;
  publishedAt: string;
  coverId: string;
  imageIds: string[];
}

const toUpdateNewsBodyDto = (
  payload: UpdateNewsPayload
): UpdateNewsBodyDto => ({
  titles: toLangRecordDto(payload.titles),
  descriptions: toLangRecordDto(payload.descriptions),
  city: toNewsCityDto(payload.city),
  publishedAt: payload.publishedAt.toISOString(),
  coverId: payload.cover.id,
  imageIds: payload.images.map((image) => image.id),
});

export const updateNews = (payload: UpdateNewsPayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/news/${payload.newsID}`, {
    method: "PUT",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toUpdateNewsBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при изменении новости"));
