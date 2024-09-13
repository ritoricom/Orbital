export const mapToWithNested = (fn) => (dto) => ({
  self: fn(dto.self),
  nested: dto.nested.map(fn),
});
