import { TableColumns } from "@/lib/data-table";
import { ActionsCell } from "@/features/misc/ui/ActionsCell";
import { displayCity } from "@/features/misc";
import { Newsletter } from "../types/newsletter";

export interface UseNewslettersTableOptions {
  canDelete: boolean;
  onEdit: (newsletter: Newsletter) => void;
  onDelete: (newsletter: Newsletter) => void;
}

export interface UseNewslettersTableReturn {
  columns: TableColumns<Newsletter>;
}

export const useNewslettersTable = (
  options: UseNewslettersTableOptions
): UseNewslettersTableReturn => ({
  columns: [
    {
      key: "header",
      type: "standard",
      field: "email",
      headerName: "E-mail",
      maxWidth: "40%",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "email",
      },
    },
    {
      key: "city",
      type: "сomputed",
      сomputed: ({ row: newsletter }) => displayCity(newsletter.city),
      headerName: "Город",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
    {
      key: "actions",
      type: "component",
      render: ({ row: newsletter }) => (
        <ActionsCell
          disabledDelete={!options.canDelete}
          onEdit={() => options.onEdit(newsletter)}
          onDelete={() => options.onDelete(newsletter)}
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
