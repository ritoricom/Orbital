import { fromLangRecordDto, LangRecordDto } from "@/features/misc";
import { fromImageDto, ImageDto } from "@/features/images";
import { fromNewsCityDto, NewsCityDto } from "./news-city-dto";
import { News } from "../../types/news";

export interface NewsDto {
  id: string;
  city: NewsCityDto;
  titles: LangRecordDto<string>;
  descriptions: LangRecordDto<string>;
  publishedAt: string;
  cover: ImageDto;
  images: ImageDto[];
}

export const fromNewsDto = (dto: NewsDto): News => ({
  id: dto.id,
  city: fromNewsCityDto(dto.city),
  titles: fromLangRecordDto(dto.titles),
  descriptions: fromLangRecordDto(dto.descriptions),
  publishedAt: new Date(dto.publishedAt),
  cover: fromImageDto(dto.cover),
  images: dto.images.map(fromImageDto),
});
