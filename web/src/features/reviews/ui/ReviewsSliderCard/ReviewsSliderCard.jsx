import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import { SplideSlide } from "@splidejs/react-splide";
import { useState } from "react";

import { useDayjs } from "@/lib/dayjs";
import { HtmlContent } from "@/lib/html-content";
import { displayDate } from "@/utils/display";
import { Rating, Text, Title } from "@/ui/data-display";
import { Button } from "@/ui/inputs";
import { ArrowIcon } from "@/ui/icons";
import { ReviewModal } from "@/features/reviews";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";

import styles from "./ReviewsSliderCard.module.css";

export const ReviewsSliderCard = ({ review }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.reviewsSliderCard",
  });

  const dayjs = useDayjs();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isLaptop = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <SplideSlide className={styles.reviewsSliderCard}>
      <div className={styles.reviewsSliderCardHeader}>
        <Text
          color="tertiary"
          variant={isLaptop ? "boldM" : "boldL"}
          className={styles.reviewsSliderCardPerson}
        >
          {review.author}
        </Text>
        <Text
          color="quaternary"
          variant={isLaptop ? "normalS" : "normalM"}
          className={styles.reviewsSliderCardDate}
        >
          {displayDate(dayjs, review.publishedAt, "DD.MM.YYYY")}
        </Text>
      </div>
      <Rating value={review.grade} />
      <div className={styles.reviewsSliderCardHideTitle}>
        <Title
          order={isLaptop ? (isMobile ? 4 : 5) : 6}
          color="primary"
          className={styles.reviewsSliderCardTitle}
        >
          {review.header}
        </Title>
      </div>
      <div className={styles.reviewsSliderTextBlock}>
        <div className={styles.reviewsSliderCardHideText}>
          <HtmlContent className={styles.reviewsSliderCardText}>
            {review.description}
          </HtmlContent>
        </div>

        <Button
          uppercase
          size="s"
          endIcon={<ArrowIcon />}
          color="secondaryDark"
          className={styles.reviewsSliderCardButton}
          onClick={handleOpen}
        >
          {t("link")}
        </Button>
      </div>
      <ReviewModal review={review} onClose={handleClose} open={open} />
    </SplideSlide>
  );
};

ReviewsSliderCard.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    grade: PropTypes.number.isRequired,
  }),
};
