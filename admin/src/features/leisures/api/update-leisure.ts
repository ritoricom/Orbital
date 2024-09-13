import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";
import { Image } from "@/features/images";

interface UpdateLeisureDay {
  title: string;
  timeAndPlace?: string;
  duration?: string;
  host?: string;
  description?: string;
}

export interface UpdateLeisurePayload {
  leisureID: string;
  title: string;
  description: string;
  note?: string;
  route?: string;
  phone?: string;
  email?: string;
  days: UpdateLeisureDay[];
  cover: Image;
  images: Image[];
}

interface UpdateLeisureBodyDto {
  title: string;
  description: string;
  note?: string;
  route?: string;
  phoneNumber?: string;
  email?: string;
  days: UpdateLeisureDay[];
  coverId: string;
  imageIds: string[];
}

const toUpdateLeisureBodyDto = (
  payload: UpdateLeisurePayload
): UpdateLeisureBodyDto => ({
  title: payload.title,
  description: payload.description,
  note: payload.note,
  route: payload.route,
  phoneNumber: payload.phone,
  email: payload.email,
  days: payload.days,
  coverId: payload.cover.id,
  imageIds: payload.images.map(({ id }) => id),
});

export const updateLeisure = (payload: UpdateLeisurePayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/leisures/${payload.leisureID}`, {
    method: "PUT",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toUpdateLeisureBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при добавлении досуга"));
