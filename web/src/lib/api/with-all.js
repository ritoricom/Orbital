export const withAll = (apiFn) =>
  apiFn(0)
    .then(({ total }) => apiFn(total))
    .then(({ items }) => items);
