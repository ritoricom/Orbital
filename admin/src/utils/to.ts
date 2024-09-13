import { Nullable, Optional } from "@/types/utility";

export const toOptional = <T>(value: Nullable<T>): Optional<T> =>
  value !== null ? value : undefined;

export const toNullable = <T>(value: Optional<T>): Nullable<T> =>
  value !== undefined ? value : null;
