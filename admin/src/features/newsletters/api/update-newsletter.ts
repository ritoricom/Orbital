import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";
import { City, CityDto, toCityDto } from "@/features/misc";

export interface UpdateNewsletterPayload {
  newsletterID: string;
  email: string;
  city: City;
}

interface UpdateNewsletterBodyDto {
  email: string;
  city: CityDto;
}

const toUpdateNewsletterBodyDto = (
  payload: UpdateNewsletterPayload
): UpdateNewsletterBodyDto => ({
  email: payload.email,
  city: toCityDto(payload.city),
});

export const updateNewsletter = async (
  payload: UpdateNewsletterPayload
): Promise<void> =>
  fetch(`${API_URL}/api/admin/newsletters/${payload.newsletterID}`, {
    method: "PUT",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toUpdateNewsletterBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при изменении рассылки"));
