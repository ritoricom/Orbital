import { TableColumns } from "@/lib/data-table";
import { ActionsCell } from "@/features/misc/ui/ActionsCell";
import { ImageCell } from "@/features/images/ui/ImageCell";
import { Leisure } from "../types/leisure";
import { LeisureLinkCell } from "../ui/LeisureLinkCell";

export interface UseLeisuresTableOptions {
  canDelete: boolean;
  onEdit: (leisure: Leisure) => void;
  onDelete: (leisure: Leisure) => void;
}

export interface UseLeisuresTableReturn {
  columns: TableColumns<Leisure>;
}

export const useLeisuresTable = (
  options: UseLeisuresTableOptions
): UseLeisuresTableReturn => ({
  columns: [
    {
      key: "cover",
      type: "component",
      render: ({ row: leisure }) => <ImageCell image={leisure.cover} />,
      headerName: "Обложка",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
    {
      key: "title",
      type: "component",
      render: ({ row: leisure }) => <LeisureLinkCell leisure={leisure} />,
      headerName: "Название",
      maxWidth: "25%",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "title",
      },
    },
    {
      key: "route",
      type: "standard",
      field: "route",
      headerName: "Маршрут",
      maxWidth: "25%",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
    {
      key: "createdAt",
      type: "date",
      field: "createdAt",
      format: "DD.MM.YY",
      headerName: "Дата создания",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "createdAt",
      },
    },
    {
      key: "actions",
      type: "component",
      render: ({ row: leisure }) => (
        <ActionsCell
          disabledDelete={!options.canDelete}
          onEdit={() => options.onEdit(leisure)}
          onDelete={() => options.onDelete(leisure)}
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
