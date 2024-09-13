export const mapFromContactsDto = (dto) => ({
  address: dto.address,
  phone: dto.phone,
  email: dto.email,
  coordinates: [dto.location.latitude, dto.location.longitude],
  vkLink: dto.vkLink,
});
