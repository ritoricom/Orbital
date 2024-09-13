import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import {
  CreateSpecialOfferPayload,
  createSpecialOffer,
} from "../api/create-special-offer";

export interface UseCreateSpecialOfferOptions {
  mutationConfig?: MutationConfig<CreateSpecialOfferPayload>;
}

export const useCreateSpecialOffer = (
  options?: UseCreateSpecialOfferOptions
): UseMutationReturn<CreateSpecialOfferPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: createSpecialOffer,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Спецпредложение успешно добавлено!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
