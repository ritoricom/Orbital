import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { CreateLeisurePayload, createLeisure } from "../api/create-leisure";

export interface UseCreateLeisureOptions {
  mutationConfig?: MutationConfig<CreateLeisurePayload>;
}

export const useCreateLeisure = (
  options?: UseCreateLeisureOptions
): UseMutationReturn<CreateLeisurePayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: createLeisure,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Досуг успешно добавлен!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
