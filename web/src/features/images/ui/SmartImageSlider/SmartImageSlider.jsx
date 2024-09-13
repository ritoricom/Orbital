import NextImage from "next/image";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import { Text } from "@/ui/data-display";
import { ArrowButton } from "@/ui/inputs";
import { isNonNullable } from "@/utils/equals";

import styles from "./SmartImageSlider.module.css";

export const SmartImageSlider = ({
  images,
  disclaimer,
  imgClassName,
  className,
}) => {
  const ref = useRef();

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const renderDisclaimer = disclaimer && (
    <Text
      variant="normalS"
      color="white"
      className={styles.smartImageSliderDisclaimer}
    >
      {disclaimer}
    </Text>
  );

  useEffect(() => {
    if (isNonNullable(ref.current)) {
      ref.current.splide.refresh();
      ref.current.splide.go(0);
    }
  }, [ref, images]);

  // very smart
  if (images.length === 1) {
    const image = images[0];

    return (
      <div className={clsx(styles.smartImageSlider, className)}>
        <NextImage
          priority
          layout="fill"
          src={image.url}
          className={clsx(styles.smartImageSliderImg, imgClassName)}
        />
        {renderDisclaimer}
      </div>
    );
  }

  return (
    <Splide
      ref={ref}
      hasTrack={false}
      options={{
        pagination: isTablet ? true : false,
        autoplay: true,
        type: "loop",
        gap: 30,
        interval: 4000,
        classes: {
          arrows: styles.smartImageSliderArrows,
          arrow: styles.smartImageSliderArrow,
        },
      }}
      className={clsx(styles.smartImageSlider, className)}
    >
      {!isTablet && (
        <div className={clsx("splide__arrows", styles.smartImageSliderArrows)}>
          <ArrowButton
            variant="small"
            prevClassName="splide__arrow splide__arrow--prev"
            className={styles.smartImageSliderArrow}
          />
          <ArrowButton
            variant="small"
            prevClassName="splide__arrow splide__arrow--next"
            className={styles.smartImageSliderArrow}
          />
        </div>
      )}
      <SplideTrack className={styles.smartImageSliderTrack}>
        {images.map((photo, index) => (
          <SplideSlide key={index} className={styles.smartImageSliderSlide}>
            <NextImage
              layout="fill"
              alt={photo.alt}
              src={photo.url}
              className={clsx(styles.smartImageSliderImg, imgClassName)}
            />
            {renderDisclaimer}
          </SplideSlide>
        ))}
      </SplideTrack>
    </Splide>
  );
};

SmartImageSlider.propTypes = {
  images: PropTypes.array,
  disclaimer: PropTypes.string,
  imgClassName: PropTypes.string,
  className: PropTypes.string,
};
