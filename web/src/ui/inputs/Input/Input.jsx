import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Input.module.css";

export const Input = forwardRef(
  (
    {
      readonly = false,
      disabled = false,
      fullWidth = false,
      type,
      placeholder,
      error,
      inputBoxClassName,
      startIcon: startIconProp,
      endIcon: endIconProp,
      onClickEndIcon,
      startIconClassName,
      endIconClassName,
      className,
      ...props
    },
    ref
  ) => (
    <div className={clsx(styles.inputBox, inputBoxClassName)}>
      {startIconProp && (
        <span className={clsx(styles.inputStartIcon, startIconClassName)}>
          {startIconProp}
        </span>
      )}
      <input
        {...props}
        ref={ref}
        readOnly={readonly}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        className={clsx(
          styles.input,
          fullWidth && styles.inputFullWidth,
          error && styles.inputError,
          startIconProp && styles.inputHasStartIcon,
          endIconProp && styles.inputHasEndIcon,
          className
        )}
      />
      {endIconProp && (
        <span
          className={clsx(styles.inputEndIcon, endIconClassName)}
          onClick={onClickEndIcon}
        >
          {endIconProp}
        </span>
      )}
    </div>
  )
);

Input.displayName = "Input";

Input.propTypes = {
  readonly: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClickEndIcon: PropTypes.func,
  endIconClassName: PropTypes.string,
  startIconClassName: PropTypes.string,
  className: PropTypes.string,
};
