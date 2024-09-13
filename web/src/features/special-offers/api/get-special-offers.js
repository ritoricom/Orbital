import { mapToPaginated } from "@/lib/api";
import { API_URL } from "@/config/api";
import { mapFromSpecialOfferDto } from "@/features/special-offers";
import { checkSuccess } from "@/utils/check-success";

const mapToGetSpecialOffersParamsDto = ({ lang, page, pageSize }) =>
  new URLSearchParams({
    language: lang,
    page: page,
    pageSize: pageSize,
  }).toString();

export const getSpecialOffers = ({ lang, page, pageSize }) =>
  fetch(
    `${API_URL}/api/special-offers?${mapToGetSpecialOffersParamsDto({
      lang,
      page,
      pageSize,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapToPaginated(mapFromSpecialOfferDto));
