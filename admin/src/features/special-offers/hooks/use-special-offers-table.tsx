import { Multiline } from "@/lib/multiline";
import { TableColumns } from "@/lib/data-table";
import { ActionsCell } from "@/features/misc/ui/ActionsCell";
import { ImageCell } from "@/features/images/ui/ImageCell";
import { SpecialOffer } from "../types/special-offer";
import { SpecialOfferLinkCell } from "../ui/SpecialOfferLinkCell";

export interface useSpecialOffersTableOptions {
  onEdit: (specialOffer: SpecialOffer) => void;
  onDelete: (specialOffer: SpecialOffer) => void;
}

export interface useSpecialOffersTableReturn {
  columns: TableColumns<SpecialOffer>;
}

export const useSpecialOffersTable = (
  options: useSpecialOffersTableOptions
): useSpecialOffersTableReturn => ({
  columns: [
    {
      key: "cover",
      type: "component",
      render: ({ row: specialOffer }) => (
        <ImageCell image={specialOffer.cover} />
      ),
      headerName: "Обложка",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
    {
      key: "name",
      type: "component",
      render: ({ row: specialOffer }) => (
        <SpecialOfferLinkCell specialOffer={specialOffer} />
      ),
      headerName: "Название",
      maxWidth: "25%",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "title",
      },
    },
    {
      key: "shortDescription",
      type: "component",
      render: ({ row: specialOffer }) => (
        <Multiline>{specialOffer.shortDescriptions.ru}</Multiline>
      ),
      headerName: "Краткое описание",
      maxWidth: "45%",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "shortDescription",
      },
    },
    {
      key: "actions",
      type: "component",
      render: ({ row: news }) => (
        <ActionsCell
          onEdit={() => options.onEdit(news)}
          onDelete={() => options.onDelete(news)}
        />
      ),
      headerName: "",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
  ],
});
