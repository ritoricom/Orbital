import { Nullable, Optional, OrEmptyString } from "@/types/utility";

export const fromEmptyStringToOptional = <T>(
  value: OrEmptyString<T>
): Optional<T> => (value === "" ? undefined : value);

export const fromEmptyStringToNullable = <T>(
  value: OrEmptyString<T>
): Nullable<T> => (value === "" ? null : value);
