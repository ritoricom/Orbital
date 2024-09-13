export const mapFromReviewDto = (dto) => ({
  id: dto.id,
  author: dto.author,
  grade: dto.grade,
  header: dto.header,
  description: dto.description,
  publishedAt: dto.publishedAt,
});
