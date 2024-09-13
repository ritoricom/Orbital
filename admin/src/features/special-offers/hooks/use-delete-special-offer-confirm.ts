import { useConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { deleteSpecialOffer } from "../api/delete-special-offer";

export interface UseDeleteSpecialOfferConfirmOptions {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}

export interface UseDeleteSpecialOfferConfirmReturn {
  openDeleteSpecialOfferConfirm: (specialOfferID: string) => void;
}

export const useDeleteSpecialOfferConfirm = (
  options?: UseDeleteSpecialOfferConfirmOptions
): UseDeleteSpecialOfferConfirmReturn => {
  const confirm = useConfirm();

  const openDeleteSpecialOfferConfirm = (specialOfferID: string) => {
    confirm({
      title: "Вы точно хотите удалить спецпредложение?",
      labels: {
        confirm: "Удалить",
      },
      onConfirm: async () => {
        await deleteSpecialOffer({ specialOfferID });
        notify({
          kind: "success",
          title: "Спецпредложение успешно удалено!",
        });

        options?.onSuccess?.();
      },
    });
  };

  return {
    openDeleteSpecialOfferConfirm,
  };
};
