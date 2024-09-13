import { FC, useState } from "react";
import { Editor } from "@tiptap/core";
import ToggleButton from "@mui/material/ToggleButton";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { LinkIcon } from "@/ui/icons";
import { Nullable } from "@/types/utility";
import { getOr } from "@/utils/fp";

export interface LinkControlProps {
  editor: Editor;
  className?: string;
}

export const LinkControl: FC<LinkControlProps> = ({ editor, className }) => {
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const [url, setUrl] = useState("");

  const selected = editor.isActive("link");
  const open = Boolean(anchorEl);
  const id = open ? "link-control-popover" : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    const url = getOr("")(editor?.getAttributes("link").href);

    setAnchorEl(event.currentTarget);
    setUrl(url);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUrl("");

    editor.chain().focus().extendMarkRange("link").run();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSave = () => {
    setAnchorEl(null);
    setUrl("");

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <>
      <ToggleButton
        size="small"
        value="link"
        selected={selected}
        className={className}
        onClick={handleOpen}
      >
        <LinkIcon />
      </ToggleButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={{
          zIndex: 10000,
          "& .MuiPopover-paper": {
            padding: "12px 16px",
          },
        }}
        onClose={handleClose}
      >
        <TextField
          type="url"
          size="small"
          variant="outlined"
          value={url}
          sx={{
            "& .MuiOutlinedInput-root .MuiInputBase-input": {
              padding: "6px 10px",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "170%",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderRadius: "4px",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: "4px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          onClick={handleSave}
        >
          Сохранить
        </Button>
      </Popover>
    </>
  );
};
