import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { noopFn } from "@/utils/noop";
import {
  City,
  CityDto,
  LangRecord,
  LangRecordDto,
  toCityDto,
  toLangRecordDto,
} from "@/features/misc";
import { LocationDto, toLocationDto } from "./dto/location-dto";
import { Location } from "../types/location";
import { throwErrorCtx } from "@/lib/error-ctx";

export interface UpdateContactsPayload {
  addresses: LangRecord<string>;
  city: City;
  email: string;
  phone: string;
  location: Location;
  vkLink: string;
}

interface UpdateContactsBodyDto {
  addresses: LangRecordDto<string>;
  city: CityDto;
  email: string;
  phone: string;
  location: LocationDto;
  vkLink: string;
}

const toUpdateContactsBodyDto = (
  payload: UpdateContactsPayload
): UpdateContactsBodyDto => ({
  addresses: toLangRecordDto(payload.addresses),
  city: toCityDto(payload.city),
  email: payload.email,
  phone: payload.phone,
  location: toLocationDto(payload.location),
  vkLink: payload.vkLink,
});

export const updateContacts = async (
  payload: UpdateContactsPayload
): Promise<void> =>
  fetch(`${API_URL}/api/admin/contacts`, {
    method: "PUT",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toUpdateContactsBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при изменении контактов"));
