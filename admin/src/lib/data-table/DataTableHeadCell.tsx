import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";

import { SortOrder } from "@/lib/sorting";
import { ArrowDownIcon } from "@/ui/icons";
import { isNonNullable } from "@/utils/eq";
import { Nullable } from "@/types/utility";
import { RowData, TableColumn, TableSortable } from "./types";

export interface DataTableHeadCellProps<T extends RowData> {
  column: TableColumn<T>;
  sortable: TableSortable;
}

const getIcon = (order: SortOrder): Nullable<JSX.Element> => {
  switch (order) {
    case "desc":
      return <ArrowDownIcon />;
    case "asc":
      return <ArrowDownIcon sx={{ transform: "rotate(180deg)" }} />;
    default:
      return null;
  }
};

export const DataTableHeadCell = <T extends RowData>({
  column,
  sortable,
}: DataTableHeadCellProps<T>) => {
  const handelClick = () => {
    if (column.sortOptions.sortable) {
      sortable.nextSorting(column.sortOptions.field);
    }
  };

  return (
    <TableCell component="th" align="left">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          sx={{
            ...(column.sortOptions.sortable && {
              cursor: "pointer",
              userSelect: "none",
            }),
          }}
          onClick={handelClick}
        >
          {column.headerName}
        </Box>
        {column.sortOptions.sortable &&
          isNonNullable(sortable.sorting.order) &&
          isNonNullable(sortable.sorting.field) &&
          sortable.sorting.field === column.sortOptions.field &&
          getIcon(sortable.sorting.order)}
      </Box>
    </TableCell>
  );
};
