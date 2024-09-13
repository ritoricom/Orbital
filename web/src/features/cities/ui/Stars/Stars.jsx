import PropTypes from "prop-types";
import { StarIcon } from "@/ui/icons/StarIcon";

import styles from "./Stars.module.css";

export const Stars = ({ value }) => (
  <div className={styles.stars}>
    {new Array(value).fill(null).map((_, index) => (
      <StarIcon key={index} />
    ))}
  </div>
);

Stars.propTypes = {
  value: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
};
