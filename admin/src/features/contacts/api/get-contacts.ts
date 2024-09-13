import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { City } from "@/features/misc";
import { fromContactsDto } from "./dto/contacts-dto";
import { Contacts } from "../types/contacts";

export interface GetContactsPayload {
  city: City;
}

export const getContacts = (payload: GetContactsPayload): Promise<Contacts> =>
  fetch(`${API_URL}/api/admin/contacts/${payload.city}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromContactsDto);
