import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";

import { Optional } from "@/types/utility";
import { isNonNullable } from "@/utils/eq";
import { range } from "@/utils/misc";
import { DataTableBodyRow } from "./DataTableBodyRow";
import { DataTableHeadRow } from "./DataTableHeadRow";
import { DataTableSkeletonRow } from "./DataTableSkeletonRow";
import { RowData, TableColumns, TableSortable } from "./types";

export interface DataTableProps<T extends RowData> {
  loading: boolean;
  skeletonCount: number;
  rows: Optional<T[]>;
  columns: TableColumns<T>;
  sortable: TableSortable;
}

export const DataTable = <T extends RowData>({
  loading,
  skeletonCount,
  rows,
  columns,
  sortable,
}: DataTableProps<T>) => (
  <Table>
    <TableHead>
      <DataTableHeadRow columns={columns} sortable={sortable} />
    </TableHead>
    <TableBody>
      {loading &&
        range(0, skeletonCount - 1).map((idx) => (
          <DataTableSkeletonRow key={idx} columns={columns} />
        ))}
      {!loading &&
        isNonNullable(rows) &&
        rows.map((row, idx) => (
          <DataTableBodyRow key={idx} row={row} idx={idx} columns={columns} />
        ))}
    </TableBody>
  </Table>
);
