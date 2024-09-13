import { Splide, SplideTrack } from "@splidejs/react-splide";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { HotelRoomsThumbCard } from "@/features/cities";
import { ArrowButton } from "@/ui/inputs";

import styles from "./RoomsSlider.module.css";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";

export const RoomsSlider = ({ start, rooms, onMove }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.splide.on("move", (newIndex) => onMove(rooms[newIndex]));
  }, [onMove, rooms]);

  const renderRoomsSliderCards = rooms.map((room) => (
    <HotelRoomsThumbCard room={room} key={room.id} />
  ));

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <Splide
      hasTrack={false}
      options={{
        isNavigation: true,
        pagination: false,
        drag: false,
        perPage: 3,
        perMove: 1,
        focus: 1,
        start: start,
        gap: "28px",
        type: "loop",
        ...(isTablet && {
          drag: true,
          perPage: 2,
          gap: "16px",
          focus: 0,
        }),
        ...(isMobile && {
          perPage: 1,
          padding: "16px",
        }),
      }}
      ref={ref}
    >
      <div className="splide__arrows">
        <ArrowButton
          size="large"
          prevClassName="splide__arrow splide__arrow--prev"
          className={styles.roomsSliderArrowPrev}
        />
        <ArrowButton
          size="large"
          prevClassName="splide__arrow splide__arrow--next"
          className={styles.roomsSliderArrowNext}
        />
      </div>
      <SplideTrack>{renderRoomsSliderCards}</SplideTrack>
    </Splide>
  );
};

RoomsSlider.propTypes = {
  start: PropTypes.number.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onMove: PropTypes.func.isRequired,
};
