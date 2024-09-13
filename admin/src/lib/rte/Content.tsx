import { FC } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import Box from "@mui/material/Box";

import { toNullable } from "@/utils/to";

export interface ContentProps {
  error?: boolean;
  editor?: Editor;
}

export const Content: FC<ContentProps> = ({ error = false, editor }) => (
  <Box
    component={EditorContent}
    editor={toNullable(editor)}
    sx={(theme) => ({
      "& .ProseMirror": {
        padding: "10px 16px 10px",
        fontSize: "16px",
        lineHeight: "180%",
        color: theme.palette.text.secondary,
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "2px",
        outline: "none",
        ...(error && {
          borderColor: theme.palette.error.main,
        }),
      },
      ...(!error && {
        "& .ProseMirror:hover": {
          borderColor: theme.palette.primary.main,
        },
      }),
      "& .ProseMirror-focused": {
        padding: "9px 15px 9px",
        borderWidth: "2px",
      },
      "& .ProseMirror [data-placeholder]:first-of-type::before": {
        position: "absolute",
        color: "#adb5bd",
        content: "attr(data-placeholder)",
        float: "left",
        height: "0",
        pointerEvents: "none",
        ...(error && {
          color: theme.palette.error.main,
        }),
      },
      "& .ProseMirror > *:last-child": {
        margin: 0,
      },
      "& .ProseMirror p": {
        margin: "0 0 7px",
      },
      "& .ProseMirror a": {
        margin: "0",
        color: theme.palette.text.secondary,
        textDecoration: "underline",
        textDecorationColor: "rgba(209, 169, 110, 0.4)",
      },
    })}
  />
);
