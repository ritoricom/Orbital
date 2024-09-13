import PropTypes from "prop-types";

import { useDayjs } from "@/lib/dayjs";
import { HtmlContent } from "@/lib/html-content";
import { displayDate } from "@/utils/display";
import { Rating, Text } from "@/ui/data-display";
import { Modal, ModalHeader } from "@/ui/overlay";

import styles from "./ReviewModal.module.css";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";

export const ReviewModal = ({ open, review, onClose }) => {
  const dayjs = useDayjs();

  const isLaptop = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <Modal onClose={onClose} open={open}>
      <ModalHeader
        title={review.header}
        onClose={onClose}
        className={styles.reviewModalHeader}
      />
      <Rating value={review.grade} />
      <div className={styles.reviewModalBody}>
        <Text
          color="tertiary"
          variant={isLaptop ? "boldM" : "boldL"}
          className={styles.reviewModalAuthor}
        >
          {review.author}
        </Text>
        <Text
          color="quaternary"
          variant={isLaptop ? "normalS" : "normalM"}
          className={styles.reviewModalDate}
        >
          {displayDate(dayjs, review.publishedAt, "DD.MM.YYYY")}
        </Text>
      </div>
      <HtmlContent className={styles.reviewModalDescription}>
        {review.description}
      </HtmlContent>
    </Modal>
  );
};

ReviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    grade: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
