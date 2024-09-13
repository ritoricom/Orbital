import PropTypes from "prop-types";

import styles from "./BreadcrumbsSeparator.module.css";

export const BreadcrumbsSeparator = ({ children }) => (
  <li className={styles.breadcrumbsSeparator}>{children}</li>
);

BreadcrumbsSeparator.propTypes = {
  children: PropTypes.node,
};
