import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./LeisureCardGrid.module.css";

export const LeisureCardGrid = ({ className, children }) => (
  <ul className={clsx(styles.leisureCardGrid, className)}>{children}</ul>
);

LeisureCardGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
