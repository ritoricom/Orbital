import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

import { Container } from "@/ui/layout";
import { isEmptyArray } from "@/utils/equals";
import { Divider, Title } from "@/ui/data-display";
import { ReviewsSlider } from "@/features/reviews";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";

import styles from "./HotelReviews.module.css";

export const HotelReviews = ({ reviews }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.hotelReviews",
  });

  const isLaptop = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  if (isEmptyArray(reviews)) {
    return null;
  }

  return (
    <Container className={styles.hotelReviewsContainer}>
      {!isLaptop && <Divider />}

      <Title
        order={isLaptop ? (isMobile ? 2 : 3) : 2}
        color="primary"
        className={styles.hotelReviewsTitle}
      >
        {t("title")}
      </Title>

      <ReviewsSlider reviews={reviews} />
    </Container>
  );
};

HotelReviews.propTypes = {
  reviews: PropTypes.array,
};
