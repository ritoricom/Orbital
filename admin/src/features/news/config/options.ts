import { SelectOptions } from "@/types/select";
import { createOptionsByDisplay } from "@/utils/select";
import { NewsCity } from "../types/news-city";
import { displayNewsCity } from "../utils/display";

export const newsCityOptions: SelectOptions<NewsCity> = createOptionsByDisplay(
  displayNewsCity
)(["all", "spb", "obn", "nvz"]);
