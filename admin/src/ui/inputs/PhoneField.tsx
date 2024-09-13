import * as React from "react";
import { IMaskInput } from "react-imask";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TextField from "@mui/material/TextField";

export interface PhoneMaskProps {
  name: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
}

//  parse phone from format "+{7} (000) 00 00 000"
const parsePhone = (phone: string): string => {
  // "+{7} (*000*) 00 00 000";
  const part1 = phone.slice(4, 7);
  // "+{7} (000) *00* 00 000";
  const part2 = phone.slice(9, 11);
  // "+{7} (000) 00 *00* 000";
  const part3 = phone.slice(12, 14);
  // "+{7} (000) 00 00 *000*";
  const part4 = phone.slice(15, 18);

  return `${part1}${part2}${part3}${part4}`;
};

const PhoneMask = React.forwardRef<HTMLElement, PhoneMaskProps>(
  ({ name, onChange, ...props }, ref) => (
    <IMaskInput
      {...props}
      overwrite
      mask="+{7} (000) 00 00 000"
      inputRef={ref as any}
      onAccept={(value: any) => {
        onChange({ target: { name, value: parsePhone(value) } });
      }}
    />
  )
);

export interface PhoneFieldProps<T extends FieldValues> {
  multiline?: boolean;
  disabled?: boolean;
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const PhoneField = <T extends FieldValues>({
  multiline = false,
  disabled = false,
  label,
  name,
  control,
}: PhoneFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        fullWidth
        multiline={multiline}
        disabled={disabled}
        label={label}
        margin="normal"
        error={!!error}
        helperText={error?.message}
        InputProps={{
          inputComponent: PhoneMask as any,
        }}
      />
    )}
  />
);
