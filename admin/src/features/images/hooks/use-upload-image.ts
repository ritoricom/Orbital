import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { UploadImagePayload, uploadImage } from "../api/upload-image";
import { Image } from "../types/image";

export interface UseUploadImageOptions {
  mutationConfig?: MutationConfig<UploadImagePayload, Image>;
}

export const useUploadImage = (
  options?: UseUploadImageOptions
): UseMutationReturn<UploadImagePayload, Image> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: uploadImage,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Изображение успешно загружено!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
