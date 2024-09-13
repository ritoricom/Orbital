import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Multiline.module.css";

export const Multiline = ({ className, children }) => (
  <span className={clsx(styles.multiline, className)}>{children}</span>
);

Multiline.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
