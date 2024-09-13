import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

import { SelectOptions, SelectValue } from "@/types/select";
import { isNonNullable } from "@/utils/eq";

export interface SelectProps<T extends FieldValues, O extends SelectValue> {
  disabled?: boolean;
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: SelectOptions<O>;
}

export const Select = <T extends FieldValues, O extends SelectValue>({
  disabled = false,
  label,
  name,
  control,
  options,
}: SelectProps<T, O>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <FormControl disabled={disabled} fullWidth sx={{ mt: 2, mb: 1 }}>
        <InputLabel disabled={disabled} error={!!error} id={name}>
          {label}
        </InputLabel>
        <MuiSelect
          disabled={disabled}
          error={!!error}
          labelId={name}
          label={label}
          {...field}
        >
          {options.map(({ label, value }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </MuiSelect>
        {isNonNullable(error) && (
          <FormHelperText disabled={disabled} error>
            {error.message}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);
