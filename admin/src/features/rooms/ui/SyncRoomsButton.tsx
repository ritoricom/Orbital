import { FC } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import { SyncIcon } from "@/ui/icons";
import { useSyncRooms } from "@/features/rooms";

export interface SyncRoomsButtonProps {
  onSuccess?: () => void;
}

export const SyncRoomsButton: FC<SyncRoomsButtonProps> = ({ onSuccess }) => {
  const { isLoading, mutate: syncRooms } = useSyncRooms({
    mutationConfig: {
      onSuccess,
    },
  });

  const handleClick = () => {
    syncRooms();
  };

  return (
    <LoadingButton
      fullWidth
      variant="contained"
      size="medium"
      loading={isLoading}
      endIcon={<SyncIcon />}
      sx={{
        maxWidth: "220px",
      }}
      onClick={handleClick}
    >
      Синхронизировать
    </LoadingButton>
  );
};
