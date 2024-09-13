---
to: <%= path %>/<%= name %>.jsx
---
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./<%= name %>.module.css";

export const <%= name %> = ({ className }) => (
  <div className={clsx(styles.<%= h.changeCase.camel(name) %>, className)}></div>
);

<%= name %>.propTypes = {
  className: PropTypes.string,
};
