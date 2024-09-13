import TableRow from "@mui/material/TableRow";

import { DataTableSkeletonCell } from "./DataTableSkeletonCell";
import { RowData, TableColumns } from "./types";

export interface DataTableSkeletonRowProps<T extends RowData> {
  columns: TableColumns<T>;
}

export const DataTableSkeletonRow = <T extends RowData>({
  columns,
}: DataTableSkeletonRowProps<T>) => (
  <TableRow>
    {columns.map((column) => (
      <DataTableSkeletonCell key={column.key} column={column} />
    ))}
  </TableRow>
);
