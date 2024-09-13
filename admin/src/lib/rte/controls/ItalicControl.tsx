import { FC } from "react";
import { Editor } from "@tiptap/core";
import ToggleButton from "@mui/material/ToggleButton";

import { FormatItalicIcon } from "@/ui/icons";

export interface ItalicControlProps {
  editor: Editor;
  className?: string;
}

export const ItalicControl: FC<ItalicControlProps> = ({
  editor,
  className,
}) => {
  const selected = editor.isActive("italic");
  const disabled = !editor.can().chain().focus().toggleItalic().run();

  const handleClick = () => {
    editor.chain().focus().toggleItalic().run();
  };

  return (
    <ToggleButton
      size="small"
      value="italic"
      selected={selected}
      disabled={disabled}
      className={className}
      onClick={handleClick}
    >
      <FormatItalicIcon />
    </ToggleButton>
  );
};
