import { ChangeEvent, FC, useRef } from "react";

import { notify } from "@/lib/notify";
import { isNonNullable } from "@/utils/eq";
import { API_MAX_LIMIT_FILE_SIZE_BYTES } from "@/config/api";

export interface Clickable {
  onClick: () => void;
}

export interface FileButtonProps {
  accept: string;
  onChange(payload: File): void;
  children: FC<Clickable>;
}

export const FileButton: FC<FileButtonProps> = ({
  accept,
  onChange,
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (isNonNullable(inputRef.current)) {
      inputRef.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isNonNullable(event.currentTarget.files)) {
      return;
    }

    const file = event.currentTarget.files[0];
    if (!isNonNullable(file)) {
      return;
    }

    if (file.size > API_MAX_LIMIT_FILE_SIZE_BYTES) {
      notify({
        kind: "error",
        title: "Превышен лимит размера файла для загрузки",
      });

      return;
    }

    onChange(file);
  };

  return (
    <>
      {children({ onClick })}
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept={accept}
        onChange={handleChange}
      />
    </>
  );
};
