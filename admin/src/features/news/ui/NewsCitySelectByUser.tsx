import { FC } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { NewsCity } from "../types/news-city";
import { newsCityOptions } from "../config/options";

export interface NewsCitySelectByUserProps {
  disabled: boolean;
  value: NewsCity;
  onChange: (value: NewsCity) => void;
}

export const NewsCitySelectByUser: FC<NewsCitySelectByUserProps> = ({
  disabled,
  value,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as NewsCity);
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
        {newsCityOptions.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
