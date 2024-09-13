import { API_URL } from "@/config/api";
import { mapFromContactsDto } from "./dto/contacts-dto.js";
import { checkSuccess } from "@/utils/check-success.js";

const mapToGetContactParamsDto = ({ city, lang }) =>
  new URLSearchParams({
    city: city,
    language: lang,
  }).toString();
export const getContacts = ({ city, lang }) =>
  fetch(
    `${API_URL}/api/contacts?${mapToGetContactParamsDto({
      city,
      lang,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapFromContactsDto);
