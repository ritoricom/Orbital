export const mapFromLeisureDayDto = (dto) => ({
  title: dto.title,
  timeAndPlace: dto.timeAndPlace,
  duration: dto.duration,
  host: dto.host,
  description: dto.description,
});
