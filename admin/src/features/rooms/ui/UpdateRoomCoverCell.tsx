import { FC } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

import { FileButton } from "@/lib/file-button";
import { ImageIcon } from "@/ui/icons";
import { useUpdateRoomCover } from "@/features/rooms";

export interface UpdateRoomCoverCellProps {
  roomID: string;
  onSuccess?: () => void;
}

export const UpdateRoomCoverCell: FC<UpdateRoomCoverCellProps> = ({
  roomID,
  onSuccess,
}) => {
  const { isLoading, mutate: updateRoomCover } = useUpdateRoomCover({
    mutationConfig: {
      onSuccess,
    },
  });

  const handleChange = (file: File) => {
    updateRoomCover({ roomID, file });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <FileButton accept="image/png,image/jpeg" onChange={handleChange}>
        {({ onClick }) => (
          <Tooltip placement="top" title="Рекомендуемое разрешение: 686x473">
            <IconButton onClick={onClick}>
              {isLoading ? <CircularProgress /> : <ImageIcon />}
            </IconButton>
          </Tooltip>
        )}
      </FileButton>
    </Box>
  );
};
