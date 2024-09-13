import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";
import { City, CityDto, toCityDto } from "@/features/misc";

export interface CreateNewsletterPayload {
  email: string;
  city: City;
}

interface CreateNewsletterBodyDto {
  email: string;
  city: CityDto;
}

const toCreateNewsletterBodyDto = (
  payload: CreateNewsletterPayload
): CreateNewsletterBodyDto => ({
  email: payload.email,
  city: toCityDto(payload.city),
});

export const createNewsletter = async (
  payload: CreateNewsletterPayload
): Promise<void> =>
  fetch(`${API_URL}/api/admin/newsletters`, {
    method: "POST",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toCreateNewsletterBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при добавлении рассылки"));
