import { Nullable } from "@/types/utility";
import { mapNullable } from "@/utils/fp";
import {
  CityDto,
  LangRecordDto,
  fromCityDto,
  fromLangRecordDto,
} from "@/features/misc";
import { ImageDto, fromImageDto } from "@/features/images";
import { Room } from "@/features/rooms";

export interface RoomDto {
  id: string;
  titles: LangRecordDto<string>;
  descriptions: LangRecordDto<string>;
  peculiarities: LangRecordDto<string[]>;
  price: number;
  city: CityDto;
  cover: Nullable<ImageDto>;
  images: ImageDto[];
}

export const fromRoomDto = (dto: RoomDto): Room => ({
  id: dto.id,
  titles: fromLangRecordDto(dto.titles),
  descriptions: fromLangRecordDto(dto.descriptions),
  peculiarities: fromLangRecordDto(dto.peculiarities),
  price: dto.price,
  city: fromCityDto(dto.city),
  cover: mapNullable(fromImageDto)(dto.cover),
  images: dto.images.map(fromImageDto),
});
