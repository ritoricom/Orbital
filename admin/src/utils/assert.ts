import { isNonNullable } from "./eq";

export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) {
    throw Error(msg);
  }
}

export function assertNotNullable<T>(
  value: T,
  msg?: string
): asserts value is NonNullable<T> {
  if (!isNonNullable(value)) {
    throw Error(msg);
  }
}
