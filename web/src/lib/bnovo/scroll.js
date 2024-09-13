import { isNonNullable } from "@/utils/equals";
import { scrollTo } from "@/utils/scroll";
import { BNOVO_ROOT_ID } from "./BookingPanel";

export const scrollToBookingPanel = () => {
  const bookingPanel = document.querySelector(`#${BNOVO_ROOT_ID}`);
  if (!isNonNullable(bookingPanel)) {
    return;
  }

  scrollTo({ elem: bookingPanel, offset: 90, duration: 1000 });
};
