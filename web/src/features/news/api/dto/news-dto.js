import { mapFromImageDto } from "@/features/images";

export const mapFromNewsDto = (dto) => ({
  id: dto.id,
  city: dto.city,
  title: dto.title,
  description: dto.description,
  publicationAt: dto.publishedAt,
  cover: mapFromImageDto(dto.cover),
  images: dto.images.map(mapFromImageDto),
});
