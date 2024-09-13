import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./CityCardGrid.module.css";

export const CityCardGrid = ({ className, children }) => (
  <ul className={clsx(styles.cityCardGrid, className)}>{children}</ul>
);

CityCardGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
