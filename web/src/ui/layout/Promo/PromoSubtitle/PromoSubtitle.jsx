import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./PromoSubtitle.module.css";

export const PromoSubtitle = ({ className, children }) => (
  <h2 className={clsx(styles.promoSubtitle, className)}>{children}</h2>
);

PromoSubtitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
