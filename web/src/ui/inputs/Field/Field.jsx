import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Field.module.css";

export const Field = ({ disabled, label, error, className, children }) => (
  <div className={clsx(styles.field, className)}>
    <label
      className={clsx(
        styles.fieldLabel,
        disabled && styles.fieldLabelDisabled,
        error && styles.fieldLabelError
      )}
    >
      {label}
    </label>
    {children}
    {error && <span className={styles.fieldError}>{error}</span>}
  </div>
);

Field.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
