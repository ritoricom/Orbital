import TableCell from "@mui/material/TableCell";

import { displayDate, displayNullable } from "@/utils/display";
import { isNonNullable } from "@/utils/eq";
import { foldNullable } from "@/utils/fp";
import { RowData, TableColumn } from "./types";

export interface DataTableBodyCellProps<T extends RowData> {
  row: T;
  idx: number;
  column: TableColumn<T>;
}

export const DataTableBodyCell = <T extends RowData>({
  row,
  idx,
  column,
}: DataTableBodyCellProps<T>) => {
  const getInner = () => {
    switch (column.type) {
      case "standard":
        return displayNullable(row[column.field] as string | number);
      case "date":
        return foldNullable<Date, string>(
          (date) => displayDate(date, column.format),
          displayNullable
        )(row[column.field] as Date);
      case "сomputed":
        return column.сomputed({
          row,
          idx,
        });
      case "component":
        return column.render({
          row,
          idx,
        });
    }
  };

  return (
    <TableCell
      align={column.align}
      sx={{
        ...(isNonNullable(column.maxWidth) && {
          width: "100%",
          maxWidth: column.maxWidth,
        }),
      }}
    >
      {getInner()}
    </TableCell>
  );
};
