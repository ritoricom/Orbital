import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { updateRoomCover } from "@/features/rooms";
import { uploadImage } from "@/features/images";

export interface UseUpdateRoomCoverPayload {
  roomID: string;
  file: File;
}

export interface UseUpdateRoomCoverOptions {
  mutationConfig?: MutationConfig<UseUpdateRoomCoverPayload>;
}

export const useUpdateRoomCover = (
  options?: UseUpdateRoomCoverOptions
): UseMutationReturn<UseUpdateRoomCoverPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: async (payload: UseUpdateRoomCoverPayload) => {
      const image = await uploadImage({ file: payload.file });
      await updateRoomCover({
        roomID: payload.roomID,
        imageID: image.id,
      });
    },
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Обложка номера успешно обновлена!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
