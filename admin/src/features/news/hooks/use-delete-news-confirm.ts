import { useConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { useAuthorization } from "@/lib/authorization";
import { deleteNews } from "../api/delete-news";

export interface UseDeleteNewsConfirmOptions {
  onSuccess?: () => void;
}

export interface UseDeleteNewsConfirmReturn {
  canDelete: boolean;
  openDeleteNewsConfirm: (newsID: string) => void;
}

export const useDeleteNewsConfirm = (
  options?: UseDeleteNewsConfirmOptions
): UseDeleteNewsConfirmReturn => {
  const confirm = useConfirm();
  const { checkAccess } = useAuthorization();

  const canDelete = checkAccess({ allowedRoles: ["admin"] });

  const openDeleteNewsConfirm = (newsID: string) => {
    confirm({
      title: "Вы точно хотите удалить новость?",
      labels: {
        confirm: "Удалить",
      },
      onConfirm: async () => {
        await deleteNews({ newsID });
        notify({
          kind: "success",
          title: "Новость успешно удалена!",
        });

        options?.onSuccess?.();
      },
    });
  };

  return {
    canDelete,
    openDeleteNewsConfirm,
  };
};
