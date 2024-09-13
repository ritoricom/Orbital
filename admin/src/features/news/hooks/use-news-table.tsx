import { TableColumns } from "@/lib/data-table";
import { ActionsCell } from "@/features/misc/ui/ActionsCell";
import { ImageCell } from "@/features/images/ui/ImageCell";
import { News } from "../types/news";
import { NewsLinkCell } from "../ui/NewsLinkCell";
import { displayNewsCity } from "../utils/display";

export interface UseNewsTableOptions {
  canDelete: boolean;
  onEdit: (news: News) => void;
  onDelete: (news: News) => void;
}

export interface UseNewsTableReturn {
  columns: TableColumns<News>;
}

export const useNewsTable = (
  options: UseNewsTableOptions
): UseNewsTableReturn => ({
  columns: [
    {
      key: "cover",
      type: "component",
      render: ({ row: room }) => <ImageCell image={room.cover} />,
      headerName: "Обложка",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
    {
      key: "name",
      type: "component",
      render: ({ row: news }) => <NewsLinkCell news={news} />,
      headerName: "Название",
      maxWidth: "25%",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "title",
      },
    },
    {
      key: "city",
      type: "сomputed",
      сomputed: ({ row: news }) => displayNewsCity(news.city),
      headerName: "Город",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
    {
      key: "price",
      type: "date",
      field: "publishedAt",
      format: "DD.MM.YY",
      headerName: "Дата публикации",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "publishedAt",
      },
    },
    {
      key: "actions",
      type: "component",
      render: ({ row: news }) => (
        <ActionsCell
          disabledDelete={!options.canDelete}
          onEdit={() => options.onEdit(news)}
          onDelete={() => options.onDelete(news)}
        />
      ),
      headerName: "",
      align: "right",
      sortOptions: {
        sortable: false,
      },
    },
  ],
});
