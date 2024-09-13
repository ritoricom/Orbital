import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

export interface DatePickerFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const DatePickerField = <T extends FieldValues>({
  label,
  name,
  control,
}: DatePickerFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <DesktopDatePicker
        {...field}
        inputFormat="DD/MM/YYYY"
        label={label}
        renderInput={(props) => (
          <TextField
            {...props}
            margin="normal"
            fullWidth
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    )}
  />
);
