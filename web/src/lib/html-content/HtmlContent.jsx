import clsx from "clsx";
import PropTypes from "prop-types";

import { Text } from "@/ui/data-display";

import styles from "./HtmlContent.module.css";

export const HtmlContent = ({ className, children }) => (
  <Text
    component="div"
    color="secondary"
    variant="normalL"
    dangerouslySetInnerHTML={{ __html: children }}
    className={clsx(styles.htmlContent, className)}
  />
);

HtmlContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};
