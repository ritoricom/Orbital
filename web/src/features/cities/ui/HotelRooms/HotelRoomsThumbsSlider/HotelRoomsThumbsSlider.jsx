import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Splide, SplideTrack } from "@splidejs/react-splide";

import { ArrowButton } from "@/ui/inputs";
import { HotelRoomsThumbCard } from "./HotelRoomsThumbCard";

import styles from "./HotelRoomsThumbsSlider.module.css";
import { useMediaQuery } from "@/lib/media";
import { S_BREAKPOINT_DOWN, XL_BREAKPOINT_DOWN } from "@/config/breakpoints";

export const HotelRoomsThumbsSlider = forwardRef(({ rooms }, ref) => {
  const renderHotelRoomsThumb = rooms.map((room) => (
    <HotelRoomsThumbCard room={room} key={room.id} />
  ));

  const isLaptop = useMediaQuery(XL_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <Splide
      hasTrack={false}
      options={{
        rewind: true,
        isNavigation: true,
        pagination: false,
        drag: false,
        perPage: 4,
        perMove: 1,
        focus: 1,
        gap: "28px",
        type: "loop",
        ...(isLaptop && { focus: 0, perPage: 1, drag: true }),
        ...(isMobile && { gap: "16px" }),
      }}
      ref={ref}
    >
      <div className="splide__arrows">
        <ArrowButton
          size="large"
          prevClassName="splide__arrow splide__arrow--prev"
          className={styles.hotelRoomsThumbsSliderArrowPrev}
        />
        <ArrowButton
          size="large"
          prevClassName="splide__arrow splide__arrow--next"
          className={styles.hotelRoomsThumbsSliderArrowNext}
        />
      </div>
      <SplideTrack>{renderHotelRoomsThumb}</SplideTrack>
    </Splide>
  );
});

HotelRoomsThumbsSlider.displayName = "HotelRoomsThumbsSlider";

HotelRoomsThumbsSlider.propTypes = {
  rooms: PropTypes.array,
};
