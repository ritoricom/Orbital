import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import {
  UpdateNewsletterPayload,
  updateNewsletter,
} from "../api/update-newsletter";

export interface UseUpdateNewsletterOptions {
  mutationConfig?: MutationConfig<UpdateNewsletterPayload>;
}

export const useUpdateNewsletter = (
  options?: UseUpdateNewsletterOptions
): UseMutationReturn<UpdateNewsletterPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: updateNewsletter,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Рассылка успешно изменена!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
