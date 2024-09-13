import { useMutation } from "@tanstack/react-query";

import { MutationConfig, UseMutationReturn } from "@/lib/react-query";
import { notify } from "@/lib/notify";
import {
  changeUserPassword,
  ChangeUserPasswordPayload,
} from "../api/change-user-password";

export interface UseChangeUserPasswordOptions {
  mutationConfig?: MutationConfig<ChangeUserPasswordPayload>;
}

export const useChangeUserPassword = (
  options?: UseChangeUserPasswordOptions
): UseMutationReturn<ChangeUserPasswordPayload> =>
  useMutation({
    ...options?.mutationConfig,
    mutationFn: changeUserPassword,
    onSuccess: (...args) => {
      notify({
        kind: "success",
        title: "Пароль пользователя успешно изменен!",
      });

      options?.mutationConfig?.onSuccess?.(...args);
    },
  });
