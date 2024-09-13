import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Button.module.css";

import { ButtonSpinner } from "./ButtonSpinner";
// TODO: impl loading prop

const buttonSize = {
  s: "s",
  m: "m",
  l: "l",
  xl: "xl",
};
const buttonColor = {
  primary: "primary",
  secondaryLight: "secondaryLight",
  secondaryDark: "secondaryDark",
};

const getSizeClassName = (size) => {
  switch (size) {
    case buttonSize.s:
      return styles.buttonSizeS;
    case buttonSize.l:
      return styles.buttonSizeL;
    case buttonSize.xl:
      return styles.buttonSizeXL;
    case buttonSize.m:
    default:
      return styles.buttonSizeM;
  }
};
const getColorClassName = (color) => {
  switch (color) {
    case buttonColor.secondaryLight:
      return styles.buttonColorSecondaryLight;
    case buttonColor.secondaryDark:
      return styles.buttonColorSecondaryDark;
    case buttonColor.primary:
    default:
      return styles.buttonColorPrimary;
  }
};

export const Button = forwardRef(
  (
    {
      loading = false,
      disabled,
      uppercase = false,
      fullWidth = false,
      type = "button",
      size = "m",
      color = "primary",
      startIcon: startIconProp,
      endIcon: endIconProp,
      component: Component = "button",
      className,
      children,
      ...others
    },
    ref
  ) => (
    <Component
      ref={ref}
      disabled={disabled}
      type={type}
      className={clsx(
        styles.button,
        uppercase && styles.buttonUppercase,
        fullWidth && styles.buttonFullWidth,
        getSizeClassName(size),
        getColorClassName(color),
        className
      )}
      {...others}
    >
      {loading ? (
        <ButtonSpinner />
      ) : (
        <>
          {children}
          {startIconProp}
          {endIconProp}
        </>
      )}
    </Component>
  )
);

Button.displayName = "Button";

Button.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.oneOf(Object.values(buttonSize)),
  color: PropTypes.oneOf(Object.values(buttonColor)),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};
