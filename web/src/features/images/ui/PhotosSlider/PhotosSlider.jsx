import PropTypes from "prop-types";
import NextImage from "next/image";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import clsx from "clsx";

import { useMediaQuery } from "@/lib/media";
import { XL_BREAKPOINT_DOWN } from "@/config/breakpoints";

import styles from "./PhotosSlider.module.css";
import { ArrowButton } from "@/ui/inputs";

export const PhotosSlider = ({
  photos,
  className,
  photoClassName,
  autoplay = false,
}) => {
  const isLaptop = useMediaQuery(XL_BREAKPOINT_DOWN);

  const renderPhoto = photos.map((image) => (
    <SplideSlide key={image.id} className={styles.photosSlider}>
      <NextImage
        priority
        layout="fill"
        alt={image.id}
        src={image.url}
        className={clsx(styles.photosSliderImg, photoClassName)}
      />
    </SplideSlide>
  ));

  return (
    <Splide
      className={className}
      hasTrack={false}
      options={{
        autoplay: autoplay,
        pagination: false,
        perPage: 3,
        perMove: 1,
        gap: "28px",
        type: "loop",
        interval: 4000,
        ...(isLaptop && { pagination: true, perPage: 1 }),
      }}
    >
      <div className="splide__arrows">
        <ArrowButton
          size="large"
          prevClassName="splide__arrow splide__arrow--prev"
          className={styles.photosSliderArrowPrev}
        />
        <ArrowButton
          size="large"
          prevClassName="splide__arrow splide__arrow--next"
          className={styles.photosSliderArrowNext}
        />
      </div>
      <SplideTrack>{renderPhoto}</SplideTrack>
    </Splide>
  );
};

PhotosSlider.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  className: PropTypes.string,
  photoClassName: PropTypes.string,
};
