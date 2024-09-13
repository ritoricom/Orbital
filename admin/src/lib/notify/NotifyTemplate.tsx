import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ErrorIcon, SuccessIcon } from "@/ui/icons";
import { isNonNullable } from "@/utils/eq";
import { NotifyKind } from "./types";

export interface NotifyTemplateProps {
  kind: NotifyKind;
  title: string;
  desc?: string;
}

const getIconByKind = (kind: NotifyKind) => {
  switch (kind) {
    case "success":
      return <SuccessIcon />;
    case "error":
      return <ErrorIcon />;
  }
};

export const NotifyTemplate: FC<NotifyTemplateProps> = ({
  kind,
  title,
  desc,
}) => (
  <Box
    sx={{
      display: "flex",
      gap: "18px",
      marginRight: "8px",
    }}
  >
    {getIconByKind(kind)}
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "420px",
      }}
    >
      <Typography variant="h5">{title}</Typography>
      {isNonNullable(desc) && (
        <Typography
          variant="body1"
          component="span"
          sx={{
            marginTop: "6px",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "180%",
            color: "#9A9A9A",
          }}
        >
          {desc}
        </Typography>
      )}
    </Box>
  </Box>
);
