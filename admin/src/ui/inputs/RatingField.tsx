import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FormHelperText from "@mui/material/FormHelperText";

import { isNonNullable } from "@/utils/eq";

export interface RatingFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const RatingField = <T extends FieldValues>({
  label,
  name,
  control,
}: RatingFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <FormControl sx={{ mt: 2, mb: 1 }}>
        <Typography
          variant="textL"
          component="legend"
          sx={{ marginBottom: "8px", color: "#726B5D" }}
        >
          {label}
        </Typography>
        <Rating
          name={name}
          value={value}
          onChange={(_, value) => {
            onChange(value);
          }}
          onBlur={onBlur}
        />
        {isNonNullable(error) && (
          <FormHelperText error>{error.message}</FormHelperText>
        )}
      </FormControl>
    )}
  />
);
