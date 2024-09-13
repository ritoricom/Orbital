import { FC } from "react";
import { Editor } from "@tiptap/core";
import ToggleButton from "@mui/material/ToggleButton";

import { FormatUnderlineIcon } from "@/ui/icons";

export interface UnderlineControlProps {
  editor: Editor;
  className?: string;
}

export const UnderlineControl: FC<UnderlineControlProps> = ({
  editor,
  className,
}) => {
  const selected = editor.isActive("underline");
  const disabled = !editor.can().chain().focus().toggleUnderline().run();

  const handleClick = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  return (
    <ToggleButton
      size="small"
      value="underline"
      selected={selected}
      disabled={disabled}
      className={className}
      onClick={handleClick}
    >
      <FormatUnderlineIcon />
    </ToggleButton>
  );
};
