import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import { HotelRoomsThumbsSlider } from "../HotelRoomsThumbsSlider";
import { HotelRoomsBannerSlider } from "../HotelRoomsBannerSlider";

export const HotelRoomsSlider = ({ rooms }) => {
  const thumbsRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);
  return (
    <>
      <HotelRoomsThumbsSlider rooms={rooms} ref={thumbsRef} />
      <HotelRoomsBannerSlider rooms={rooms} ref={mainRef} />
    </>
  );
};

HotelRoomsSlider.propTypes = {
  photos: PropTypes.array,
};
