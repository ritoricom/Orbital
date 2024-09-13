import { FC } from "react";

import { Sorting } from "@/lib/sorting";
import { GetKeysDateValues, GetKeysPrimitiveValues } from "@/types/utility";

export type RowData = Record<string, unknown>;

export interface TableSortable {
  sorting: Sorting;
  nextSorting: (field: string) => void;
}

export interface TableCtx<T extends RowData> {
  row: T;
  idx: number;
}

export type TableColumnAlign = "left" | "right";

// sorting

export interface AvailableSortOptions {
  sortable: true;
  field: string;
}

export interface NonSortOptions {
  sortable: false;
}

export type SortOptions = AvailableSortOptions | NonSortOptions;

// column

export interface TableStandardColumn<T extends RowData> {
  key: string;
  type: "standard";
  field: GetKeysPrimitiveValues<T>;
  headerName: string;
  maxWidth?: string;
  align: TableColumnAlign;
  sortOptions: SortOptions;
}

export interface TableDateColumn<T extends RowData> {
  key: string;
  type: "date";
  field: GetKeysDateValues<T>;
  format?: string;
  headerName: string;
  maxWidth?: string;
  align: TableColumnAlign;
  sortOptions: SortOptions;
}

export interface TableComputedColumn<T extends RowData> {
  key: string;
  type: "сomputed";
  сomputed: (ctx: TableCtx<T>) => string;
  headerName: string;
  maxWidth?: string;
  align: TableColumnAlign;
  sortOptions: SortOptions;
}

export interface TableRenderColumn<T extends RowData> {
  key: string;
  type: "component";
  render: FC<TableCtx<T>>;
  headerName: string;
  maxWidth?: string;
  align: TableColumnAlign;
  sortOptions: SortOptions;
}

export type TableColumn<T extends RowData> =
  | TableStandardColumn<T>
  | TableDateColumn<T>
  | TableComputedColumn<T>
  | TableRenderColumn<T>;

export interface TableRowCtx<T extends RowData> {
  row: T;
  idx: number;
  column: TableColumn<T>;
}

export type TableColumns<T extends RowData> = TableColumn<T>[];
