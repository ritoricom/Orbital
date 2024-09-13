import {
  CityDto,
  LangRecordDto,
  fromCityDto,
  fromLangRecordDto,
} from "@/features/misc";
import { Review } from "../../types/review";

export interface ReviewDto {
  id: string;
  authors: LangRecordDto<string>;
  headers: LangRecordDto<string>;
  descriptions: LangRecordDto<string>;
  grade: number;
  city: CityDto;
  publishedAt: string;
}

export const fromReviewDto = (dto: ReviewDto): Review => ({
  id: dto.id,
  authors: fromLangRecordDto(dto.authors),
  headers: fromLangRecordDto(dto.headers),
  descriptions: fromLangRecordDto(dto.descriptions),
  grade: dto.grade,
  city: fromCityDto(dto.city),
  publishedAt: new Date(dto.publishedAt),
});
