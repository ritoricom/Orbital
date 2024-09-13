import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { City } from "@/features/misc";
import { uploadImage } from "@/features/images";
import { addHotelImage } from "../api/add-hotel-image";

export interface UseAddHotelImagePayload {
  city: City;
  file: File;
}

export interface UseAddHotelImageOptions {
  mutationConfig?: MutationConfig<UseAddHotelImagePayload>;
}

export const useAddHotelImage = (
  options?: UseAddHotelImageOptions
): UseMutationReturn<UseAddHotelImagePayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: async (payload: UseAddHotelImagePayload) => {
      const image = await uploadImage({ file: payload.file });
      await addHotelImage({
        city: payload.city,
        imageID: image.id,
      });
    },
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Фотография отеля успешно добавлена!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
