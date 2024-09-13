import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Splide } from "@splidejs/react-splide";
import { HotelRoomsBannerCard } from "./HotelRoomsBannerCard";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

export const HotelRoomsBannerSlider = forwardRef(({ rooms }, ref) => {
  const renderHotelRoomsBannerSlider = rooms.map((room) => (
    <HotelRoomsBannerCard room={room} key={room.id} />
  ));

  const isLaptop = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <Splide
      ref={ref}
      options={{
        pagination: false,
        rewind: true,
        arrows: false,
        drag: false,
        perPage: 1,
        perMove: 1,
        type: "fade",
        gap: "1rem",
        ...(isLaptop && { drag: true }),
      }}
    >
      {renderHotelRoomsBannerSlider}
    </Splide>
  );
});

HotelRoomsBannerSlider.displayName = "HotelRoomsBannerSlider";

HotelRoomsBannerSlider.propTypes = {
  rooms: PropTypes.array,
};
