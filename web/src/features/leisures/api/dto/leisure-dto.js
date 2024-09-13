import { mapFromImageDto } from "@/features/images";
import { mapFromLeisureDayDto } from "./leisure-day-dto";

export const mapFromLeisureDto = (dto) => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  note: dto.note,
  route: dto.route,
  phone: dto.phoneNumber,
  email: dto.email,
  cover: mapFromImageDto(dto.cover),
  images: dto.images.map(mapFromImageDto),
  days: dto.days.map(mapFromLeisureDayDto),
  createdAt: dto.createdAt,
});
