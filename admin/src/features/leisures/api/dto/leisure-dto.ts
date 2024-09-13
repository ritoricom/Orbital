import { fromImageDto, ImageDto } from "@/features/images";
import { Nullable } from "@/types/utility";
import { fromLeisureDayDto, LeisureDayDto } from "./leisure-day-dto";
import { Leisure } from "../../types/leisure";

export interface LeisureDto {
  id: string;
  title: string;
  description: string;
  note: Nullable<string>;
  route: Nullable<string>;
  phoneNumber: Nullable<string>;
  email: Nullable<string>;
  days: LeisureDayDto[];
  cover: ImageDto;
  images: ImageDto[];
  createdAt: string;
}

export const fromLeisureDto = (dto: LeisureDto): Leisure => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  note: dto.note,
  route: dto.route,
  phone: dto.phoneNumber,
  email: dto.email,
  days: dto.days.map(fromLeisureDayDto),
  cover: fromImageDto(dto.cover),
  images: dto.images.map(fromImageDto),
  createdAt: new Date(dto.createdAt),
});
