import { dayjs } from "@/lib/dayjs";
import { Nullable, Optional } from "@/types/utility";

import { assert } from "./assert";
import { isNonNullable } from "./eq";

export const displayError = (err: unknown): string => {
  assert(err instanceof Error);

  return err.message;
};

export const NO_DATA = "Нет данных";

export const displayNullable = <T>(
  data?: Nullable<T> | Optional<T>
): T | string => (isNonNullable(data) ? data : NO_DATA);

export const displayDate = (date: Date, format = "DD.MM.YY HH:mm"): string =>
  isNonNullable(date) ? dayjs(date).format(format) : NO_DATA;

export const displayPhone = (phone: string): string => {
  const part1 = phone.slice(0, 3);
  const part2 = phone.slice(3, 5);
  const part3 = phone.slice(5, 7);
  const part4 = phone.slice(7, 10);

  return `+7 (${part1}) ${part2} ${part3} ${part4}`;
};
