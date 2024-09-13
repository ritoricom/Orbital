import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { UpdateLeisurePayload, updateLeisure } from "../api/update-leisure";

export interface UseUpdateLeisureOptions {
  mutationConfig?: MutationConfig<UpdateLeisurePayload>;
}

export const useUpdateLeisure = (
  options?: UseUpdateLeisureOptions
): UseMutationReturn<UpdateLeisurePayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: updateLeisure,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Досуг успешно изменен!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
