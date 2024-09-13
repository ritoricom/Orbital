import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Title.module.css";

const titleOrders = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
};

const variantMapping = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

const titleColor = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  quaternary: "quaternary",
  quinary: "quinary",
  white: "white",
};

const getOrderClassName = (order) => {
  switch (order) {
    case titleOrders[1]:
      return styles.titleOrder1;
    case titleOrders[2]:
      return styles.titleOrder2;
    case titleOrders[3]:
      return styles.titleOrder3;
    case titleOrders[4]:
      return styles.titleOrder4;
    case titleOrders[5]:
      return styles.titleOrder5;
    case titleOrders[6]:
      return styles.titleOrder6;
  }
};

const getColorClassName = (color) => {
  switch (color) {
    case titleColor.primary:
      return styles.titleColorPrimary;
    case titleColor.secondary:
      return styles.titleColorSecondary;
    case titleColor.tertiary:
      return styles.titleColorTertiary;
    case titleColor.quaternary:
      return styles.titleColorQuaternary;
    case titleColor.quinary:
      return styles.titleColorQuinary;
    case titleColor.white:
      return styles.titleColorWhite;
  }
};

export const Title = forwardRef(
  (
    {
      order = titleOrders[3],
      color = "primary",
      component,
      className,
      children,
      ...others
    },
    ref
  ) => {
    const Component = component || variantMapping[order] || "h3";

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.title,
          getOrderClassName(order),
          getColorClassName(color),
          className
        )}
        {...others}
      >
        {children}
      </Component>
    );
  }
);

Title.displayName = "Title";

Title.propTypes = {
  order: PropTypes.oneOf(Object.values(titleOrders)),
  color: PropTypes.oneOf(Object.values(titleColor)),
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};
