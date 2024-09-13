import { FC } from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const FormatItalicIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path>
  </SvgIcon>
);
