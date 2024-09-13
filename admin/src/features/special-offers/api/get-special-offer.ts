import { API_URL } from "@/config/api";
import { getBearerAuthHeader, checkSuccess } from "@/lib/api";
import { fromSpecialOfferDto } from "./dto/special-offer-dto";
import { SpecialOffer } from "../types/special-offer";

export interface GetSpecialOfferPayload {
  specialOfferID: string;
}

export const getSpecialOffer = (
  payload: GetSpecialOfferPayload
): Promise<SpecialOffer> =>
  fetch(`${API_URL}/api/admin/special-offers/${payload.specialOfferID}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromSpecialOfferDto);
