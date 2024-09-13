import { Nullable, Optional } from "@/types/utility";
import { isNonNullable } from "@/utils/eq";

export const getOr =
  <T>(defaultValue: T) =>
  (value: Nullable<T> | Optional<T>): T =>
    isNonNullable(value) ? value : defaultValue;

export const getOrEmptyString = getOr("");

export const getOrElse =
  <T>(or: () => T) =>
  (value: Nullable<T> | Optional<T>): T =>
    isNonNullable(value) ? value : or();

export const mapNullable =
  <T, R>(mapFn: (value: T) => R) =>
  (value: Nullable<T> | Optional<T>): Nullable<R> =>
    isNonNullable(value) ? mapFn(value) : null;

export const foldNullable =
  <T, R>(onSome: (value: T) => R, onNone: () => R) =>
  (value: Nullable<T> | Optional<T>): R =>
    isNonNullable(value) ? onSome(value) : onNone();
