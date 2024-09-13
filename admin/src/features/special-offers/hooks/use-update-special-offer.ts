import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import {
  UpdateSpecialOfferPayload,
  updateSpecialOffer,
} from "../api/update-special-offer";

export interface UseUpdateSpecialOfferOptions {
  mutationConfig?: MutationConfig<UpdateSpecialOfferPayload>;
}

export const useUpdateSpecialOffer = (
  options?: UseUpdateSpecialOfferOptions
): UseMutationReturn<UpdateSpecialOfferPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: updateSpecialOffer,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Спецпредложение успешно изменено!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
