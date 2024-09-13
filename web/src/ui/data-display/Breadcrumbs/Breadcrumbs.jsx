import { Children, isValidElement } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { isLastInArray } from "@/utils/equals";
import { BreadcrumbsSeparator } from "./BreadcrumbsSeparator";

import styles from "./Breadcrumbs.module.css";

const insertSeparators = (children, separator = "/") =>
  children.reduce(
    (acc, child, idx) =>
      !isLastInArray(children, idx)
        ? [
            ...acc,
            child,
            <BreadcrumbsSeparator key={`separator-${idx}`}>
              {separator}
            </BreadcrumbsSeparator>,
          ]
        : [...acc, child],
    []
  );

export const Breadcrumbs = ({ className, children }) => {
  const renderChildren = Children.toArray(children)
    .filter(isValidElement)
    .map((child, index, array) => (
      <li
        key={`child-${index}`}
        className={clsx(index == array.length - 1 && styles.breadcrumbsLast)}
      >
        {child}
      </li>
    ));

  return (
    <ol className={clsx(styles.breadcrumbs, className)}>
      {insertSeparators(renderChildren, "/")}
    </ol>
  );
};

Breadcrumbs.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
};
