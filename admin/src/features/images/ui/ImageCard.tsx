import { FC } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { Image } from "@/features/images";
import { DeleteIcon, LaunchIcon } from "@/ui/icons";

export interface ImageCardProps {
  disabledDelete?: boolean;
  image: Image;
  onDelete: (image: Image) => void;
}

export const ImageCard: FC<ImageCardProps> = ({
  disabledDelete = false,
  image,
  onDelete,
}) => {
  const handleClickDelete = () => {
    onDelete(image);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        component="img"
        src={image.url}
        alt="image"
        sx={{
          width: "100%",
          height: "calc(100% - 44px)",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "4px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "3px",
        }}
      >
        <IconButton
          component="a"
          target="_blank"
          rel="noreferrer"
          href={image.url}
        >
          <LaunchIcon />
        </IconButton>
        <IconButton disabled={disabledDelete} onClick={handleClickDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
