import { FC } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { cityOptions, City } from "@/features/misc";

export interface CitySelectByUserProps {
  disabled: boolean;
  value: City;
  onChange: (value: City) => void;
}

export const CitySelectByUser: FC<CitySelectByUserProps> = ({
  disabled,
  value,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as City);
  };

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      sx={{
        maxWidth: "492px",
      }}
    >
      <InputLabel id="city" disabled={disabled}>
        Город
      </InputLabel>
      <Select
        labelId="city"
        label="Город"
        disabled={disabled}
        value={value}
        onChange={handleChange}
      >
        {cityOptions.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
