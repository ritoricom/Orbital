import { TableColumns } from "@/lib/data-table";
import { ActionsCell } from "@/features/misc/ui/ActionsCell";
import { displayCity } from "@/features/misc";
import { Review } from "../types/review";

export interface UseReviewsTableOptions {
  canDelete: boolean;
  onEdit: (review: Review) => void;
  onDelete: (review: Review) => void;
}

export interface UseReviewsTableReturn {
  columns: TableColumns<Review>;
}

export const useReviewsTable = (
  options: UseReviewsTableOptions
): UseReviewsTableReturn => ({
  columns: [
    {
      key: "header",
      type: "сomputed",
      сomputed: ({ row: review }) => review.headers.ru,
      headerName: "Заголовок",
      maxWidth: "20%",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "header",
      },
    },
    {
      key: "author",
      type: "сomputed",
      сomputed: ({ row: review }) => review.authors.ru,
      headerName: "Автор",
      maxWidth: "20%",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "author",
      },
    },
    {
      key: "grade",
      type: "standard",
      field: "grade",
      headerName: "Оценка",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "grade",
      },
    },
    {
      key: "city",
      type: "сomputed",
      сomputed: ({ row: review }) => displayCity(review.city),
      headerName: "Город",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
    {
      key: "publishedAt",
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
      render: ({ row: review }) => (
        <ActionsCell
          disabledDelete={!options.canDelete}
          onEdit={() => options.onEdit(review)}
          onDelete={() => options.onDelete(review)}
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
