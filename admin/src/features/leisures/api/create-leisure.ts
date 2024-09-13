import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { noopFn } from "@/utils/noop";
import { Image } from "@/features/images";

interface CreateLeisureDay {
  title: string;
  timeAndPlace?: string;
  duration?: string;
  host?: string;
  description?: string;
}

export interface CreateLeisurePayload {
  title: string;
  description: string;
  note?: string;
  route?: string;
  phone?: string;
  email?: string;
  days: CreateLeisureDay[];
  cover: Image;
  images: Image[];
}

interface CreateLeisureBodyDto {
  title: string;
  description: string;
  note?: string;
  route?: string;
  phoneNumber?: string;
  email?: string;
  days: CreateLeisureDay[];
  coverId: string;
  imageIds: string[];
}

const toCreateLeisureBodyDto = (
  payload: CreateLeisurePayload
): CreateLeisureBodyDto => ({
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

export const createLeisure = (payload: CreateLeisurePayload): Promise<void> =>
  fetch(`${API_URL}/api/admin/leisures`, {
    method: "POST",
    headers: {
      ...getBearerAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toCreateLeisureBodyDto(payload)),
  })
    .then(checkSuccess)
    .then(noopFn)
    .catch(throwErrorCtx("Ошибка при добавлении досуга"));
