import TableRow from "@mui/material/TableRow";

import { DataTableHeadCell } from "./DataTableHeadCell";
import { RowData, TableColumns, TableSortable } from "./types";

export interface DataTableHeadRowProps<T extends RowData> {
  columns: TableColumns<T>;
  sortable: TableSortable;
}

export const DataTableHeadRow = <T extends RowData>({
  columns,
  sortable,
}: DataTableHeadRowProps<T>) => (
  <TableRow>
    {columns.map((column) => (
      <DataTableHeadCell key={column.key} column={column} sortable={sortable} />
    ))}
  </TableRow>
);
