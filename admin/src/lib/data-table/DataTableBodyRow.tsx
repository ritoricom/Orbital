import TableRow from "@mui/material/TableRow";

import { DataTableBodyCell } from "./DataTableBodyCell";
import { RowData, TableColumns } from "./types";

export interface DataTableBodyRowProps<T extends RowData> {
  row: T;
  idx: number;
  columns: TableColumns<T>;
}

export const DataTableBodyRow = <T extends RowData>({
  row,
  idx,
  columns,
}: DataTableBodyRowProps<T>) => (
  <TableRow>
    {columns.map((column) => (
      <DataTableBodyCell key={column.key} row={row} idx={idx} column={column} />
    ))}
  </TableRow>
);
