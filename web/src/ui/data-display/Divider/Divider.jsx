import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Divider.module.css";

const dividerOrientation = {
  horizontal: "horizontal",
  vertical: "vertical",
};

const dividerColor = {
  primary: "primary",
  secondary: "secondary",
};

const getDividerOrientationClassName = (orientation) => {
  switch (orientation) {
    case dividerOrientation.vertical:
      return styles.dividerOrientationVertical;
    case dividerOrientation.horizontal:
      return styles.dividerOrientationHorizontal;
  }
};

const getDividerColorClassName = (color) => {
  switch (color) {
    case dividerColor.primary:
      return styles.dividerColorPrimary;
    case dividerColor.secondary:
      return styles.dividerColorSecondary;
  }
};

export const Divider = ({
  flexItem = false,
  color = dividerColor.primary,
  orientation = dividerOrientation.horizontal,
  className,
}) => (
  <hr
    className={clsx(
      styles.divider,
      flexItem && styles.dividerFlexItem,
      getDividerColorClassName(color),
      getDividerOrientationClassName(orientation),
      className
    )}
  />
);

Divider.propTypes = {
  flexItem: PropTypes.bool,
  color: PropTypes.oneOf(Object.values(dividerColor)),
  orientation: PropTypes.oneOf(Object.values(dividerOrientation)),
  className: PropTypes.string,
};
