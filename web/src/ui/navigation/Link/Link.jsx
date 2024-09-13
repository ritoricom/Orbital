import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { isNonNullable } from "@/utils/equals";
import { getLineClamp } from "@/utils/styles";

import styles from "./Link.module.css";

const linkSize = {
  l: "l",
  m: "m",
  s: "s",
};

const getSizeClassName = (size) => {
  switch (size) {
    case linkSize.l:
      return styles.linkSizeL;
    case linkSize.m:
    default:
      return styles.linkSizeM;
    case linkSize.s:
      return styles.linkSizeS;
  }
};

const linkColor = {
  light: "light",
  dark: "dark",
};

const getColorClassName = (color) => {
  switch (color) {
    case linkColor.dark:
      return styles.linkColorDark;
    case linkColor.light:
      return styles.linkColorLight;
  }
};

const getInnerColorClassName = (color) => {
  switch (color) {
    case linkColor.dark:
      return styles.linkInnerColorDark;
    case linkColor.light:
      return styles.linkInnerColorLight;
  }
};

export const Link = forwardRef(
  (
    {
      disabled = false,
      uppercase = false,
      active = false,
      href,
      size = "m",
      color = "light",
      lineClamp,
      startIcon: startIconProp,
      endIcon: endIconProp,
      component: Component = "a",
      className,
      innerClassName,
      children,
      ...others
    },
    ref
  ) => (
    <Component
      ref={ref}
      href={href}
      className={clsx(
        styles.link,
        getSizeClassName(size),
        getColorClassName(color),
        disabled && styles.linkDisabled,
        uppercase && styles.linkUppercase,
        className
      )}
      {...others}
    >
      {startIconProp}
      <span
        style={{
          ...(isNonNullable(lineClamp) && getLineClamp(lineClamp)),
        }}
        className={clsx(
          styles.linkInner,
          active && styles.linkInnerActive,
          active && getInnerColorClassName(color),
          innerClassName
        )}
      >
        {children}
      </span>
      {endIconProp}
    </Component>
  )
);

Link.displayName = "Link";

Link.propTypes = {
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  active: PropTypes.bool,
  lineClamp: PropTypes.number,
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.oneOf(Object.values(linkSize)),
  color: PropTypes.oneOf(Object.values(linkColor)),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  children: PropTypes.node,
};
