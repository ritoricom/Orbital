import { FC } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { SearchIcon } from "@/ui/icons";

export interface SearchInputProps {
  search: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    search: string
  ) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ search, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event, event.target.value);
  };

  return (
    <TextField
      fullWidth
      placeholder="Поиск..."
      value={search}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ marginRight: 0 }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        maxWidth: "470px",
      }}
      onChange={handleChange}
    />
  );
};
