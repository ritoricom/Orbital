import { mapFromImageDto } from "@/features/images";

export const mapFromSpecialOfferDto = (dto) => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  shortDescription: dto.shortDescription,
  note: dto.note,
  primaryPhone: dto.phoneNumber1,
  secondaryPhone: dto.phoneNumber2,
  cover: mapFromImageDto(dto.cover),
  images: dto.images.map(mapFromImageDto),
});
