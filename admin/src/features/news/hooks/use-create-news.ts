import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { createNews, CreateNewsPayload } from "../api/create-news";

export interface UseCreateNewsOptions {
  mutationConfig?: MutationConfig<CreateNewsPayload>;
}

export const useCreateNews = (
  options?: UseCreateNewsOptions
): UseMutationReturn<CreateNewsPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: createNews,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Новость успешно добавлена!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
