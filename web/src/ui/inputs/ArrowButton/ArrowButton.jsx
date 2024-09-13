import PropTypes from "prop-types";
import clsx from "clsx";

import { ArrowIcon } from "@/ui/icons";

import styles from "./ArrowButton.module.css";

const buttonVariant = {
  small: "small",
  large: "large",
};

const getVariantClassName = (variant) => {
  switch (variant) {
    case buttonVariant.small:
      return styles.arrowButtonSizeSmall;
    case buttonVariant.large:
    default:
      return styles.arrowButtonSizeLarge;
  }
};

export const ArrowButton = ({
  direction = "right",
  variant,
  prevClassName,
  className,
}) => (
  <button
    className={clsx(
      prevClassName,
      styles.arrowButton,
      getVariantClassName(variant),
      className
    )}
  >
    <ArrowIcon direction={direction} />
  </button>
);

ArrowButton.propTypes = {
  direction: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(buttonVariant)),
  prevClassName: PropTypes.string,
  className: PropTypes.string,
};
