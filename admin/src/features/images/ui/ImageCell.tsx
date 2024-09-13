import { FC } from "react";
import Box from "@mui/material/Box";

import { Image } from "@/features/images";
import { placeholderImage } from "@/config/image";

export interface ImageCellProps {
  image?: Image;
}

export const ImageCell: FC<ImageCellProps> = ({ image = placeholderImage }) => (
  <Box
    component="img"
    src={image.url}
    alt="image"
    sx={{
      width: "100px",
      height: "100px",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: "2px",
    }}
  />
);
