import { useAuthorization } from "@/lib/authorization";
import { useConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { deleteNewsletter } from "../api/delete-newsletter";

export interface UseDeleteNewsletterConfirmOptions {
  onSuccess?: () => void;
}

export interface UseDeleteNewsletterConfirmReturn {
  canDelete: boolean;
  openDeleteNewsletterConfirm: (newsletterID: string) => void;
}

export const useDeleteNewsletterConfirm = (
  options?: UseDeleteNewsletterConfirmOptions
): UseDeleteNewsletterConfirmReturn => {
  const confirm = useConfirm();
  const { checkAccess } = useAuthorization();

  const canDelete = checkAccess({ allowedRoles: ["admin"] });

  const openDeleteNewsletterConfirm = (newsletterID: string) => {
    confirm({
      title: "Вы точно хотите удалить рассылку?",
      labels: {
        confirm: "Удалить",
      },
      onConfirm: async () => {
        await deleteNewsletter({ newsletterID });
        notify({
          kind: "success",
          title: "Рассылка успешно удалена!",
        });

        options?.onSuccess?.();
      },
    });
  };

  return { canDelete, openDeleteNewsletterConfirm };
};
