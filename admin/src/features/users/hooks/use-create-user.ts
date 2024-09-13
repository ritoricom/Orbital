import { useMutation } from "@tanstack/react-query";

import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { createUser, CreateUserPayload } from "@/features/users";
import { notify } from "@/lib/notify";

export interface UseCreateUserOptions {
  mutationConfig?: MutationConfig<CreateUserPayload>;
}

export const useCreateUser = (
  options?: UseCreateUserOptions
): UseMutationReturn<CreateUserPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: createUser,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Пользователь успешно добавлен!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
