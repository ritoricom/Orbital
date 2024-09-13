import { API_URL } from "@/config/api";
import { checkSuccess, getBearerAuthHeader } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { fromImageDto } from "./dto/image-dto";
import { Image } from "../types/image";

export interface UploadImagePayload {
  file: File;
}

const toUploadImageBodyDto = (payload: UploadImagePayload): FormData => {
  const formData = new FormData();
  formData.append("image", payload.file);

  return formData;
};

export const uploadImage = (payload: UploadImagePayload): Promise<Image> =>
  fetch(`${API_URL}/api/admin/images`, {
    method: "POST",
    headers: {
      ...getBearerAuthHeader(),
    },
    body: toUploadImageBodyDto(payload),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromImageDto)
    .catch(throwErrorCtx("Ошибка при загрузке изображения"));
