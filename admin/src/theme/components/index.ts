import { Components, Theme } from "@mui/material/styles";

import { MuiButtonBase } from "./button-base";
import { MuiButton } from "./button";
import { MuiFormHelperText } from "./form-helper-text";
import { MuiIconButton } from "./icon-button";
import { MuiCssBaseline } from "./css-baseline";
import { MuiInputBase } from "./input-base";
import { MuiInputLabel } from "./input-label";
import { MuiLink } from "./link";
import { MuiOutlinedInput } from "./outlined-input";
import { MuiPaginationItem } from "./pagination-item";
import { MuiPaper } from "./paper";
import { MuiSelect } from "./select";
import { MuiTableCell } from "./table-cell";

export type ThemeOptionsComponents = Components<Omit<Theme, "components">>;

export const components: ThemeOptionsComponents = {
  MuiCssBaseline,
  MuiButtonBase,
  MuiButton,
  MuiFormHelperText,
  MuiIconButton,
  MuiInputBase,
  MuiInputLabel,
  MuiLink,
  MuiOutlinedInput,
  MuiPaginationItem,
  MuiPaper,
  MuiSelect,
  MuiTableCell,
};
