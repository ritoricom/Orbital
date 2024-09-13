import { useAuthorization } from "@/lib/authorization";
import { useConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { deleteReview } from "../api/delete-review";

export interface UseDeleteReviewConfirmOptions {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}

export interface UseDeleteReviewConfirmReturn {
  canDelete: boolean;
  openDeleteReviewConfirm: (reviewID: string) => void;
}

export const useDeleteReviewConfirm = (
  options?: UseDeleteReviewConfirmOptions
): UseDeleteReviewConfirmReturn => {
  const confirm = useConfirm();
  const { checkAccess } = useAuthorization();

  const canDelete = checkAccess({ allowedRoles: ["admin"] });

  const openDeleteReviewConfirm = (reviewID: string) => {
    confirm({
      title: "Вы точно хотите удалить отзыв?",
      labels: {
        confirm: "Удалить",
      },
      onConfirm: async () => {
        await deleteReview({ reviewID });
        notify({
          kind: "success",
          title: "Отзыв успешно удален!",
        });

        options?.onSuccess?.();
      },
    });
  };

  return {
    canDelete,
    openDeleteReviewConfirm,
  };
};
