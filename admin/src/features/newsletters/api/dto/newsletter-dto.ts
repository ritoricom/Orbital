import { CityDto, fromCityDto } from "@/features/misc";
import { Newsletter } from "../../types/newsletter";

export interface NewsletterDto {
  id: string;
  email: string;
  city: CityDto;
}

export const fromNewsletterDto = (dto: NewsletterDto): Newsletter => ({
  id: dto.id,
  email: dto.email,
  city: fromCityDto(dto.city),
});
