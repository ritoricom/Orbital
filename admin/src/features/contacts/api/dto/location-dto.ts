import { Location } from "../../types/location";

export interface LocationDto {
  latitude: number;
  longitude: number;
}

export const fromLocationDto = (dto: LocationDto): Location => [
  dto.latitude,
  dto.longitude,
];

export const toLocationDto = ([
  latitude,
  longitude,
]: Location): LocationDto => ({
  latitude,
  longitude,
});
