import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Main.module.css";

export const Main = ({ className, children }) => (
  <main className={clsx(styles.main, className)}>{children}</main>
);

Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
