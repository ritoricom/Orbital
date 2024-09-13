import { FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";

import { FileButton } from "@/lib/file-button";
import { AddIcon } from "@/ui/icons";
import { City } from "@/features/misc";
import { useAddHotelImage } from "../hooks/use-add-hotel-image";

export interface AddHotelImageButtonProps {
  city: City;
  onSuccess?: () => void;
}

export const AddHotelImageButton: FC<AddHotelImageButtonProps> = ({
  city,
  onSuccess,
}) => {
  const { isLoading, mutate: addHotelImage } = useAddHotelImage({
    mutationConfig: {
      onSuccess,
    },
  });

  const handleChange = (file: File) => {
    addHotelImage({ city, file });
  };

  return (
    <FileButton accept="image/png,image/jpeg" onChange={handleChange}>
      {({ onClick }) => (
        <Tooltip placement="top" title="Рекомендуемое разрешение: 448x316">
          <LoadingButton
            fullWidth
            loading={isLoading}
            variant="contained"
            size="medium"
            endIcon={<AddIcon />}
            sx={{
              maxWidth: "154px",
            }}
            onClick={onClick}
          >
            добавить
          </LoadingButton>
        </Tooltip>
      )}
    </FileButton>
  );
};
