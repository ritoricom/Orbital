import { Image } from "@/features/images";

export interface ImageDto {
  id: string;
  url: string;
}

export const fromImageDto = (dto: ImageDto): Image => ({
  id: dto.id,
  url: dto.url,
});
