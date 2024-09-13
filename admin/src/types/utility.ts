export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type NonEmptyArray<T> = [T, ...T[]];

export type MaybePromise<T> = T | Promise<T>;

export type OrEmptyString<T> = T | "";

export type GetKeysValues<T, U> = keyof {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

export type GetKeysPrimitiveValues<T> = GetKeysValues<
  T,
  Nullable<string | number>
>;

export type GetKeysDateValues<T> = GetKeysValues<T, Nullable<Date>>;
