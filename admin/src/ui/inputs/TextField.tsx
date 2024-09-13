import { Control, Controller, FieldValues, Path } from "react-hook-form";
import MuiTextField from "@mui/material/TextField";

export interface TextFieldProps<T extends FieldValues> {
  multiline?: boolean;
  disabled?: boolean;
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const TextField = <T extends FieldValues>({
  multiline = false,
  disabled = false,
  label,
  name,
  control,
}: TextFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <MuiTextField
        {...field}
        fullWidth
        multiline={multiline}
        disabled={disabled}
        label={label}
        margin="normal"
        error={!!error}
        helperText={error?.message}
      />
    )}
  />
);
