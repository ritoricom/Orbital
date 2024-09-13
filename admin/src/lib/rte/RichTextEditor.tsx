import { FC, useCallback, useEffect } from "react";
import { EditorEvents } from "@tiptap/core";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

import { toOptional } from "@/utils/to";
import { Toolbar } from "./Toolbar";
import { Content } from "./Content";

export interface RichTextEditorProps {
  error?: boolean;
  value: string;
  placeholder: string;
  onBlur: () => void;
  onChange: (value: string) => void;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  error = false,
  value,
  placeholder,
  onBlur,
  onChange,
}) => {
  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: false,
      }),
    ],
  });

  const handleUpdate = useCallback(
    ({ editor }: EditorEvents["update"]) => {
      if (!editor.isEmpty) {
        onChange(editor.getHTML());
      } else {
        onChange("");
      }
    },
    [onChange]
  );

  useEffect(() => {
    editor?.on("update", handleUpdate);

    return () => {
      editor?.off("update", handleUpdate);
    };
  }, [editor, handleUpdate]);

  useEffect(() => {
    editor?.on("blur", onBlur);

    return () => {
      editor?.off("blur", onBlur);
    };
  }, [editor, onBlur]);

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor}>
          <Toolbar editor={editor} />
        </BubbleMenu>
      )}
      <Content editor={toOptional(editor)} error={error} />
    </>
  );
};
