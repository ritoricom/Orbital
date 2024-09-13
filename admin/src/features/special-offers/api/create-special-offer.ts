import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";
import { Nullable } from "@/types/utility";
import { LangRecord, LangRecordDto, toLangRecordDto } from "@/features/misc";
import { Image } from "@/features/images";

export interface CreateSpecialOfferPayload {
  titles: LangRecord<string>;
  shortDescriptions: LangRecord<string>;
  descriptions: LangRecord<string>;
  notes: LangRecord<Nullable<string>>;
  primaryPhone?: string;
  secondaryPhone?: string;
  cover: Image;
  images: Image[];
}

interface CreateSpecialOfferBodyDto {
  titles: LangRecordDto<string>;
  shortDescriptions: LangRecordDto<string>;
  descriptions: LangRecordDto<string>;
  notes: LangRecordDto<Nullable<string>>;
  phoneNumber1?: string;
  phoneNumber2?: string;
  coverId: string;
  imageIds: string[];
}

const toCreateSpecialOfferBodyDto = (
  payload: CreateSpecialOfferPayload
): CreateSpecialOfferBodyDto => ({
  titles: toLangRecordDto(payload.titles),
  shortDescriptions: toLangRecordDto(payload.shortDescriptions),
  descriptions: toLangRecordDto(payload.descriptions),
  notes: toLangRecordDto(payload.notes),
  phoneNumber1: payload.primaryPhone,
  phoneNumber2: payload.secondaryPhone,
  coverId: payload.cover.id,
  imageIds: payload.images.map((image) => image.id),
});

export const createSpecialOffer = (
  payload: CreateSpecialOfferPayload
): Promise<void> =>
  fetch(`${API_URL}/api/admin/special-offers`, {
    method: "POST",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toCreateSpecialOfferBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при добавлении спецпредложения"));
