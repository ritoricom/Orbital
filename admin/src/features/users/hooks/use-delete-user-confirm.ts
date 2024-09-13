import { useConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { deleteUser } from "@/features/users";

export interface UseDeleteUserConfirmOptions {
  onSuccess?: (userID: string) => void;
}

export interface UseDeleteUserConfirmReturn {
  openDeleteUserConfirm: (userID: string) => void;
}

export const useDeleteUserConfirm = (
  options?: UseDeleteUserConfirmOptions
): UseDeleteUserConfirmReturn => {
  const confirm = useConfirm();

  const openDeleteUserConfirm = (userID: string) => {
    confirm({
      title: "Вы точно хотите удалить пользователя?",
      labels: {
        confirm: "Удалить",
      },
      onConfirm: async () => {
        await deleteUser({ userID });
        notify({
          kind: "success",
          title: "Пользователь успешно удален!",
        });

        options?.onSuccess?.(userID);
      },
    });
  };

  return {
    openDeleteUserConfirm,
  };
};
