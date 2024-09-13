import { Optional } from "./utility";

export type SelectValue = Optional<string | number>;

export interface SelectOption<T extends SelectValue> {
  label: string;
  value: T;
}

export type SelectOptions<T extends SelectValue> = SelectOption<T>[];
