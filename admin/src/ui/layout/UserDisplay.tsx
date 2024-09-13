import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useAuthentication } from "@/lib/authentication";
import { isNonNullable } from "@/utils/eq";

import avatarImg from "@/assets/images/avatar.png";

export const UserDisplay: FC = () => {
  const { user } = useAuthentication();

  if (!isNonNullable(user)) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <Box component="img" src={avatarImg} alt="avatar" />
      <Typography
        variant="h5"
        sx={{
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "24px",
        }}
      >
        {user.fullName}
      </Typography>
    </Box>
  );
};
