import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./SpecialOfferCardGrid.module.css";

export const SpecialOfferCardGrid = ({ className, children }) => (
  <ul className={clsx(styles.specialOfferCardGrid, className)}>{children}</ul>
);

SpecialOfferCardGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
