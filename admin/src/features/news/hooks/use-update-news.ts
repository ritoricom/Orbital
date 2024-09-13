import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { UpdateNewsPayload, updateNews } from "../api/update-news";

export interface UseUpdateNewsOptions {
  mutationConfig?: MutationConfig<UpdateNewsPayload>;
}

export const useUpdateNews = (
  options?: UseUpdateNewsOptions
): UseMutationReturn<UpdateNewsPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: updateNews,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Новость успешно изменена!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
