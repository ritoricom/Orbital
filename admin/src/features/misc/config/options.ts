import { SelectOptions } from "@/types/select";
import { createOptionsByDisplay } from "@/utils/select";
import { City } from "../types/city";
import { displayCity } from "../utils/display";

export const cityOptions: SelectOptions<City> = createOptionsByDisplay(
  displayCity
)(["spb", "obn", "nvz"]);
