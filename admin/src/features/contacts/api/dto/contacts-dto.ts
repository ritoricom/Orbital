import {
  CityDto,
  LangRecordDto,
  fromCityDto,
  fromLangRecordDto,
} from "@/features/misc";
import { fromLocationDto, LocationDto } from "./location-dto";
import { Contacts } from "../../types/contacts";

export interface ContactsDto {
  addresses: LangRecordDto<string>;
  city: CityDto;
  email: string;
  phone: string;
  location: LocationDto;
  vkLink: string;
}

export const fromContactsDto = (dto: ContactsDto): Contacts => ({
  addresses: fromLangRecordDto(dto.addresses),
  city: fromCityDto(dto.city),
  email: dto.email,
  phone: dto.phone,
  location: fromLocationDto(dto.location),
  vkLink: dto.vkLink,
});
