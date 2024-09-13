import type { SelectOptions, SelectOption, SelectValue } from "@/types/select";

export const getValuesFromSelect = <T extends SelectValue>(
  selectOptions: SelectOptions<T>
): T[] => selectOptions.map(({ value }) => value);

export const createOptionFromDisplay =
  <T extends SelectValue>(displayFn: (value: T) => string) =>
  (value: T): SelectOption<T> => ({
    value,
    label: displayFn(value),
  });

export const createOptionsByDisplay =
  <T extends SelectValue>(displayFn: (value: T) => string) =>
  (values: T[]): SelectOptions<T> =>
    values.map(createOptionFromDisplay(displayFn));
