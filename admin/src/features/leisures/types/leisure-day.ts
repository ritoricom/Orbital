import { Nullable } from "@/types/utility";

export type LeisureDay = {
  title: string;
  timeAndPlace: Nullable<string>;
  duration: Nullable<string>;
  host: Nullable<string>;
  description: string;
};
