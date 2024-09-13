import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import { isNonNullable } from "@/utils/eq";
import { RichTextEditor } from "./RichTextEditor";

export interface RichTextEditorFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const RichTextEditorField = <T extends FieldValues>({
  label,
  name,
  control,
}: RichTextEditorFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
      <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
        <RichTextEditor
          error={isNonNullable(error)}
          value={value}
          placeholder={label}
          onBlur={onBlur}
          onChange={onChange}
        />
        {isNonNullable(error) && (
          <FormHelperText error>{error.message}</FormHelperText>
        )}
      </FormControl>
    )}
  />
);
