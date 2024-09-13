// https://github.com/TanStack/query/issues/1458
export const serde = (value) => JSON.parse(JSON.stringify(value));
