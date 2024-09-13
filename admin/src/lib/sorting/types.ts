import { Nullable } from "@/types/utility";

export type SortOrder = "asc" | "desc";

export interface Sorting {
  field: Nullable<string>;
  order: Nullable<SortOrder>;
}
