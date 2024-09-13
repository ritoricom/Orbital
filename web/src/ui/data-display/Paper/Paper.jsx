import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Paper.module.css";

export const Paper = ({
  component: Component = "div",
  className,
  children,
  ...others
}) => (
  <Component className={clsx(styles.paper, className)} {...others}>
    {children}
  </Component>
);

Paper.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
