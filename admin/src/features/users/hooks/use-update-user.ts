import { useMutation } from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { updateUser, UpdateUserPayload } from "@/features/users";

export interface UseUpdateUserOptions {
  mutationConfig?: MutationConfig<UpdateUserPayload>;
}

export const useUpdateUser = (
  options?: UseUpdateUserOptions
): UseMutationReturn<UpdateUserPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: updateUser,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Пользователь успешно изменен!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
