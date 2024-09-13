import { isNonNullable } from "@/utils/equals";

export const getOr = (defaultValue) => (value) =>
  isNonNullable(value) ? value : defaultValue;

export const getOrElse = (defaultFn) => (value) =>
  isNonNullable(value) ? value : defaultFn();
