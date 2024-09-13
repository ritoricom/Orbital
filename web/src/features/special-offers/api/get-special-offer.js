import { mapToWithNested } from "@/lib/api";
import { API_URL } from "@/config/api";
import {
  mapFromSpecialOfferDto,
  SPECIAL_OFFERS_NESTED_SIZE,
} from "@/features/special-offers";
import { checkSuccess } from "@/utils/check-success";

const mapToGetSpecialOfferParamsDto = ({ nestedSize, lang }) =>
  new URLSearchParams({
    nestedSize,
    language: lang,
  }).toString();

export const getSpecialOffer = ({
  specialOfferID,
  nestedSize = SPECIAL_OFFERS_NESTED_SIZE,
  lang,
}) =>
  fetch(
    `${API_URL}/api/special-offers/${specialOfferID}?${mapToGetSpecialOfferParamsDto(
      {
        nestedSize,
        lang,
      }
    )}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapToWithNested(mapFromSpecialOfferDto));
