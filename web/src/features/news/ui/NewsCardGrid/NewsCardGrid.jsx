import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./NewsCardGrid.module.css";

export const NewsCardGrid = ({ className, children }) => (
  <ul className={clsx(styles.newsCardGrid, className)}>{children}</ul>
);

NewsCardGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
