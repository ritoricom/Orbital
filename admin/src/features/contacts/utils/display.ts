import { Location } from "../types/location";

export const displayLocation = (location: Location): string =>
  location.join(", ");
