import TableCell from "@mui/material/TableCell";
import Skeleton from "@mui/material/Skeleton";

import { RowData, TableColumn } from "./types";

export interface DataTableSkeletonCellProps<T extends RowData> {
  column: TableColumn<T>;
}

export const DataTableSkeletonCell = <
  T extends RowData
>({}: DataTableSkeletonCellProps<T>) => (
  <TableCell align="left">
    <Skeleton variant="text" />
  </TableCell>
);
