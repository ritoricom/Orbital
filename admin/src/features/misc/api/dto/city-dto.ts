import { City } from "@/features/misc";

export type CityDto = City;

export const fromCityDto = (dto: CityDto): City => dto;

export const toCityDto = (city: City): CityDto => city;
