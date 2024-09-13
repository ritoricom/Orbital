import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { UpdateContactsPayload, updateContacts } from "../api/update-contacts";

export interface UseUpdateContactsOptions {
  mutationConfig?: MutationConfig<UpdateContactsPayload>;
}

export const useUpdateContacts = (
  options?: UseUpdateContactsOptions
): UseMutationReturn<UpdateContactsPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: updateContacts,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Контакты успешно изменены!",
      });
      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
