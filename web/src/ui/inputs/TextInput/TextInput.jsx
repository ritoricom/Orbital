import { forwardRef } from "react";
import PropTypes from "prop-types";

import { Input } from "@/ui/inputs";

export const TextInput = forwardRef(
  (
    {
      readonly,
      disabled,
      fullWidth = false,
      type,
      placeholder,
      error,
      startIcon: startIconProp,
      endIcon: endIconProp,
      className,
      ...props
    },
    ref
  ) => (
    <Input
      ref={ref}
      readonly={readonly}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      type={type}
      placeholder={placeholder}
      startIcon={startIconProp}
      endIcon={endIconProp}
      className={className}
      {...props}
    />
  )
);

TextInput.displayName = "TextInput";

TextInput.propTypes = {
  readonly: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
};
