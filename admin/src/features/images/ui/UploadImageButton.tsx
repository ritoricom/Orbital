import { FC, ReactNode } from "react";
import Tooltip from "@mui/material/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";

import { FileButton } from "@/lib/file-button";
import { useUploadImage } from "../hooks/use-upload-image";
import { Image } from "../types/image";

export interface UploadImageButtonProps {
  resolution: string;
  icon: ReactNode;
  onSuccess?: (image: Image) => void;
  onError?: (err: unknown) => void;
  children: ReactNode;
}

export const UploadImageButton: FC<UploadImageButtonProps> = ({
  resolution,
  icon,
  onSuccess,
  onError,
  children,
}) => {
  const { isLoading, mutate: uploadImage } = useUploadImage({
    mutationConfig: {
      onSuccess,
      onError,
    },
  });

  const handleChange = (file: File) => {
    uploadImage({ file });
  };

  return (
    <FileButton accept="image/png,image/jpeg" onChange={handleChange}>
      {({ onClick }) => (
        <Tooltip
          placement="top"
          title={`Рекомендуемое разрешение: ${resolution}`}
        >
          <LoadingButton
            fullWidth
            variant="contained"
            color="secondary"
            size="medium"
            loading={isLoading}
            endIcon={icon}
            onClick={onClick}
          >
            {children}
          </LoadingButton>
        </Tooltip>
      )}
    </FileButton>
  );
};
