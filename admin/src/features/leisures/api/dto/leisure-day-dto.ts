import { Nullable } from "@/types/utility";
import { LeisureDay } from "../../types/leisure-day";

export type LeisureDayDto = {
  title: string;
  timeAndPlace: Nullable<string>;
  duration: Nullable<string>;
  host: Nullable<string>;
  description: string;
};

export const fromLeisureDayDto = (dto: LeisureDayDto): LeisureDay => dto;

export const toLeisureDayDto = (leisureDay: LeisureDay): LeisureDayDto =>
  leisureDay;
