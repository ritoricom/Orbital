import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import MuiTextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { VisibilityIcon, VisibilityOffIcon } from "@/ui/icons";

export interface PasswordFieldProps<T extends FieldValues> {
  disabled?: boolean;
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const PasswordField = <T extends FieldValues>({
  disabled = false,
  label,
  name,
  control,
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShow = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField
          {...field}
          fullWidth
          disabled={disabled}
          label={label}
          margin="normal"
          error={!!error}
          helperText={error?.message}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClickShow}
                  onMouseDown={handleMouseDown}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
