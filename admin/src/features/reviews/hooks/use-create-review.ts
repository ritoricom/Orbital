import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { CreateReviewPayload, createReview } from "../api/create-review";

export interface UseCreateReviewOptions {
  mutationConfig?: MutationConfig<CreateReviewPayload>;
}

export const useCreateReview = (
  options?: UseCreateReviewOptions
): UseMutationReturn<CreateReviewPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: createReview,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Рассылка успешно добавлена!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
