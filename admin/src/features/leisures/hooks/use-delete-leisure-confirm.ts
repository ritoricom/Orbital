import { useAuthorization } from "@/lib/authorization";
import { useConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { deleteLeisure } from "../api/delete-leisures";

export interface UseDeleteLeisureConfirmOptions {
  onSuccess?: () => void;
}

export interface UseDeleteLeisureConfirmReturn {
  canDelete: boolean;
  openDeleteLeisureConfirm: (leisureID: string) => void;
}

export const useDeleteLeisureConfirm = (
  options?: UseDeleteLeisureConfirmOptions
): UseDeleteLeisureConfirmReturn => {
  const confirm = useConfirm();
  const { checkAccess } = useAuthorization();

  const canDelete = checkAccess({ allowedRoles: ["admin"] });

  const openDeleteLeisureConfirm = (leisureID: string) => {
    confirm({
      title: "Вы точно хотите удалить досуг?",
      labels: {
        confirm: "Удалить",
      },
      onConfirm: async () => {
        await deleteLeisure({ leisureID });
        notify({
          kind: "success",
          title: "Досуг успешно удален!",
        });

        options?.onSuccess?.();
      },
    });
  };

  return { canDelete, openDeleteLeisureConfirm };
};
