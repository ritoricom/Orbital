import PropTypes from "prop-types";
import { Splide, SplideTrack } from "@splidejs/react-splide";
import clsx from "clsx";

import { ArrowButton } from "@/ui/inputs";
import { ReviewsSliderCard } from "../ReviewsSliderCard";
import { XL_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";

import styles from "./ReviewsSlider.module.css";

export const ReviewsSlider = ({ reviews }) => {
  const renderReviews = reviews.map((review) => (
    <ReviewsSliderCard review={review} key={review.id} />
  ));

  const isDesktop = useMediaQuery("(max-width: 1599px)");
  const isLaptop = useMediaQuery(XL_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <Splide
      hasTrack={false}
      options={{
        pagination: false,
        drag: false,
        perPage: 2,
        perMove: 1,
        gap: "28px",
        ...(isDesktop && { drag: true, perPage: 3 }),
        ...(isLaptop && { perPage: 2 }),
        ...(isMobile && { perPage: 1 }),
      }}
    >
      <div className="splide__arrows">
        <ArrowButton
          size="large"
          prevClassName="splide__arrow splide__arrow--prev"
          className={clsx(
            styles.reviewsSliderArrows,
            styles.reviewsSliderArrowPrev
          )}
        />
        <ArrowButton
          size="large"
          prevClassName="splide__arrow splide__arrow--next"
          className={clsx(
            styles.reviewsSliderArrows,
            styles.reviewsSliderArrowNext
          )}
        />
      </div>
      <SplideTrack>{renderReviews}</SplideTrack>
    </Splide>
  );
};

ReviewsSlider.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
};
