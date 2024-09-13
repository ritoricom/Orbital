export const mapToPaginated = (fn) => (dto) => ({
  items: dto.data.map(fn),
  total: dto.totalCount,
});
