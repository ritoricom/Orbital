import { ImageDto, fromImageDto } from "@/features/images";
import { LangRecordDto, fromLangRecordDto } from "@/features/misc";
import { SpecialOffer } from "../../types/special-offer";

export interface SpecialOfferDto {
  id: string;
  titles: LangRecordDto<string>;
  shortDescriptions: LangRecordDto<string>;
  descriptions: LangRecordDto<string>;
  notes: LangRecordDto<string>;
  phoneNumber1: string;
  phoneNumber2: string;
  cover: ImageDto;
  images: ImageDto[];
}

export const fromSpecialOfferDto = (dto: SpecialOfferDto): SpecialOffer => ({
  id: dto.id,
  titles: fromLangRecordDto(dto.titles),
  shortDescriptions: fromLangRecordDto(dto.shortDescriptions),
  descriptions: fromLangRecordDto(dto.descriptions),
  notes: fromLangRecordDto(dto.notes),
  primaryPhone: dto.phoneNumber1,
  secondaryPhone: dto.phoneNumber2,
  cover: fromImageDto(dto.cover),
  images: dto.images.map(fromImageDto),
});
