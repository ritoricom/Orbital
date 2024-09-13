import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import {
  CreateNewsletterPayload,
  createNewsletter,
} from "../api/create-newsletter";

export interface UseCreateNewsletterOptions {
  mutationConfig?: MutationConfig<CreateNewsletterPayload>;
}

export const useCreateNewsletter = (
  options?: UseCreateNewsletterOptions
): UseMutationReturn<CreateNewsletterPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: createNewsletter,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Рассылка успешно добавлена!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
