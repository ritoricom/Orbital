import PropTypes from "prop-types";
import clsx from "clsx";

import { Title } from "@/ui/data-display";

import styles from "./PromoTitle.module.css";

export const PromoTitle = ({
  hasWidthLimit,
  className,
  children,
  order = 1,
}) => (
  <Title
    order={order}
    color="white"
    className={clsx(
      styles.promoTitle,
      hasWidthLimit && styles.promoTitleHasWidthLimit,
      className
    )}
  >
    {children}
  </Title>
);

PromoTitle.propTypes = {
  order: PropTypes.number,
  hasWidthLimit: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
