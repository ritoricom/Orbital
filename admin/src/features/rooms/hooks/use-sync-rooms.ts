import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { syncRooms } from "@/features/rooms";

export interface UseSyncRoomsOptions {
  mutationConfig?: MutationConfig<void>;
}

export const useSyncRooms = (
  options?: UseSyncRoomsOptions
): UseMutationReturn<void> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: syncRooms,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Синхронизация номеров прошла успешно!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
