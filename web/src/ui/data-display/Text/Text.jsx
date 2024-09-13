import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Text.module.css";

const textVariants = {
  normalL: "normalL",
  normalM: "normalM",
  normalS: "normalS",
  normalXs: "normalXs",
  boldL: "boldL",
  boldM: "boldM",
  boldS: "boldS",
  boldXs: "boldXs",
  upL: "upL",
  upM: "upM",
  upS: "upS",
  upXs: "upXs",
};
const textColor = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  quaternary: "quaternary",
  quinary: "quinary",
  white: "white",
};

const getVariantClassName = (variant) => {
  switch (variant) {
    case textVariants.normalL:
      return styles.textVariantNormalL;
    case textVariants.normalM:
      return styles.textVariantNormalM;
    case textVariants.normalS:
      return styles.textVariantNormalS;
    case textVariants.normalXs:
      return styles.textVariantNormalXs;
    case textVariants.boldL:
      return styles.textVariantBoldL;
    case textVariants.boldM:
      return styles.textVariantBoldM;
    case textVariants.boldS:
      return styles.textVariantBoldS;
    case textVariants.boldXs:
      return styles.textVariantBoldXs;
    case textVariants.upL:
      return styles.textVariantUpL;
    case textVariants.upM:
      return styles.textVariantUpM;
    case textVariants.upS:
      return styles.textVariantUpS;
    case textVariants.upXs:
    default:
      return styles.textVariantUpXs;
  }
};

const getColorClassName = (color) => {
  switch (color) {
    case textColor.primary:
      return styles.textColorPrimary;
    case textColor.secondary:
      return styles.textColorSecondary;
    case textColor.tertiary:
      return styles.textColorTertiary;
    case textColor.quaternary:
      return styles.textColorQuaternary;
    case textColor.quinary:
      return styles.textColorQuinary;
    case textColor.white:
      return styles.textColorWhite;
  }
};

export const Text = forwardRef(
  (
    {
      variant = textVariants.normalM,
      component: Component = "p",
      color = "primary",
      className,
      children,
      ...others
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={clsx(
        getVariantClassName(variant),
        getColorClassName(color),
        className
      )}
      {...others}
    >
      {children}
    </Component>
  )
);

Text.displayName = "Text";

Text.propTypes = {
  variant: PropTypes.oneOf(Object.values(textVariants)),
  color: PropTypes.oneOf(Object.values(textColor)),
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};
