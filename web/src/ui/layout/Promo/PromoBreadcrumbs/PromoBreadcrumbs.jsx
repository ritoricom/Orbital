import PropTypes from "prop-types";
import clsx from "clsx";

import { Breadcrumbs } from "@/ui/data-display";

import styles from "./PromoBreadcrumbs.module.css";

export const PromoBreadcrumbs = ({ className, children }) => (
  <Breadcrumbs className={clsx(styles.promoBreadcrumbs, className)}>
    {children}
  </Breadcrumbs>
);

PromoBreadcrumbs.propTypes = {
  className: PropTypes.string,
};
