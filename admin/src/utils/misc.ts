export const notImpl = (): never => {
  throw new Error("not implemented");
};

export const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, k) => k + start);
