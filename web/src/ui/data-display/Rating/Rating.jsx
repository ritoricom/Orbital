import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./Rating.module.css";

export const Rating = ({ value }) => (
  <div className={styles.rating}>
    {new Array(5).fill(null).map((_, index) => (
      <span
        key={index}
        className={clsx(
          styles.ratingCircle,
          index >= value ? styles.ratingCircleEmpty : styles.ratingCircleFilled
        )}
      ></span>
    ))}
  </div>
);

Rating.propTypes = {
  value: PropTypes.oneOf([1, 2, 3, 4, 5]),
};
