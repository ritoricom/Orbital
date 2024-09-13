import { FC } from "react";
import { Editor } from "@tiptap/react";

import { Paper, ToggleButtonGroup } from "@mui/material";
import {
  BoldControl,
  ItalicControl,
  UnderlineControl,
  LinkControl,
} from "./controls";

export interface ToolbarProps {
  editor: Editor;
}

export const Toolbar: FC<ToolbarProps> = ({ editor }) => (
  <Paper>
    <ToggleButtonGroup
      sx={(theme) => ({
        "& .MuiToggleButtonGroup-grouped": {
          margin: theme.spacing(0.5),
          border: 0,
          "&.Mui-disabled": {
            border: 0,
          },
          "&:not(:first-of-type)": {
            borderRadius: "4px",
          },
          "&:first-of-type": {
            borderRadius: "4px",
          },
        },
      })}
    >
      <BoldControl editor={editor} />
      <ItalicControl editor={editor} />
      <UnderlineControl editor={editor} />
      <LinkControl editor={editor} />
    </ToggleButtonGroup>
  </Paper>
);
