import { useAuthorization } from "@/lib/authorization";
import { useConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { deleteHotelImage } from "../api/delete-hotel-image";

export interface UseDeleteHotelImageConfirmOptions {
  onSuccess?: () => void;
}

export interface UseDeleteHotelImageConfirmReturn {
  canDelete: boolean;
  openDeleteHotelImageConfirm: (imageID: string) => void;
}

export const useDeleteHotelImageConfirm = (
  options?: UseDeleteHotelImageConfirmOptions
): UseDeleteHotelImageConfirmReturn => {
  const confirm = useConfirm();
  const { checkAccess } = useAuthorization();

  const canDelete = checkAccess({ allowedRoles: ["admin"] });

  const openDeleteHotelImageConfirm = (imageID: string) => {
    confirm({
      title: "Вы точно хотите удалить фотографию отеля?",
      labels: {
        confirm: "Удалить",
      },
      onConfirm: async () => {
        await deleteHotelImage({ imageID });
        notify({
          kind: "success",
          title: "Фотография отеля успешно удалена!",
        });

        options?.onSuccess?.();
      },
    });
  };

  return {
    canDelete,
    openDeleteHotelImageConfirm,
  };
};
