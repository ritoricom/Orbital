import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Container.module.css";

export const Container = ({ className, children }) => (
  <div className={clsx(styles.container, className)}>{children}</div>
);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
