import { mapFromImageDto } from "@/features/images";

export const mapFromRoomDto = (dto) => ({
  id: dto.id,
  title: dto.title,
  city: dto.city,
  description: dto.description,
  peculiarities: dto.peculiarities,
  price: dto.price,
  cover: dto.cover && mapFromImageDto(dto.cover),
  images: dto.images.map(mapFromImageDto),
});
