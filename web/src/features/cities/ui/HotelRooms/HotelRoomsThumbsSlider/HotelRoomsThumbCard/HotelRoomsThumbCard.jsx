import PropTypes from "prop-types";
import { SplideSlide } from "@splidejs/react-splide";

import { Text } from "@/ui/data-display";

import styles from "./HotelRoomsThumbCard.module.css";
import { XL_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";

export const HotelRoomsThumbCard = ({ room }) => {
  const isLaptop = useMediaQuery(XL_BREAKPOINT_DOWN);
  return (
    <SplideSlide className={styles.hotelRoomsThumbCard}>
      <Text
        color="tertiary"
        variant={isLaptop ? "boldM" : "boldL"}
        className={styles.hotelRoomsThumbCardText}
      >
        {room.title}
      </Text>
    </SplideSlide>
  );
};

HotelRoomsThumbCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};
