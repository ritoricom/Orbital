import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { UpdateReviewPayload, updateReview } from "../api/update-review";

export interface UseUpdateReviewOptions {
  mutationConfig?: MutationConfig<UpdateReviewPayload>;
}

export const useUpdateReview = (
  options?: UseUpdateReviewOptions
): UseMutationReturn<UpdateReviewPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: updateReview,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Отзыв успешно изменен!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
