import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";
import { Image } from "@/features/images";
import { LangRecord, LangRecordDto, toLangRecordDto } from "@/features/misc";
import { NewsCityDto, toNewsCityDto } from "./dto/news-city-dto";
import { NewsCity } from "../types/news-city";

export interface CreateNewsPayload {
  titles: LangRecord<string>;
  descriptions: LangRecord<string>;
  city: NewsCity;
  publishedAt: Date;
  cover: Image;
  images: Image[];
}

interface CreateNewsBodyDto {
  titles: LangRecordDto<string>;
  descriptions: LangRecordDto<string>;
  city: NewsCityDto;
  publishedAt: string;
  coverId: string;
  imageIds: string[];
}

const toCreateNewsBodyDto = (
  payload: CreateNewsPayload
): CreateNewsBodyDto => ({
  titles: toLangRecordDto(payload.titles),
  descriptions: toLangRecordDto(payload.descriptions),
  city: toNewsCityDto(payload.city),
  publishedAt: payload.publishedAt.toISOString(),
  coverId: payload.cover.id,
  imageIds: payload.images.map((image) => image.id),
});

export const createNews = (payload: CreateNewsPayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/news`, {
    method: "POST",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toCreateNewsBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при добавлении новости"));
