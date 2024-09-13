import { FC } from "react";
import { Editor } from "@tiptap/core";
import ToggleButton from "@mui/material/ToggleButton";

import { FormatBoldIcon } from "@/ui/icons";

export interface BoldControlProps {
  editor: Editor;
  className?: string;
}

export const BoldControl: FC<BoldControlProps> = ({ editor, className }) => {
  const selected = editor.isActive("bold");
  const disabled = !editor.can().chain().focus().toggleBold().run();

  const handleClick = () => {
    editor.chain().focus().toggleBold().run();
  };

  return (
    <ToggleButton
      size="small"
      value="bold"
      selected={selected}
      disabled={disabled}
      className={className}
      onClick={handleClick}
    >
      <FormatBoldIcon />
    </ToggleButton>
  );
};
