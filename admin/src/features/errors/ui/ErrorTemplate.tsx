import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { isNonNullable } from "@/utils/eq";

export interface ErrorTemplateProps {
  statusCode?: number;
  description: string;
}

export const ErrorTemplate: FC<ErrorTemplateProps> = ({
  statusCode,
  description,
}) => {
  const handleClick = () => {
    window.location.assign(window.location.origin);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      {isNonNullable(statusCode) && (
        <Typography
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: "300px",
            lineHeight: "110%",
            color: "#726B5D",
          }}
        >
          {statusCode}
        </Typography>
      )}
      <Typography>{description}</Typography>
      <Button
        variant="contained"
        size="medium"
        sx={{ mt: "30px" }}
        onClick={handleClick}
      >
        обновить страницу
      </Button>
    </Box>
  );
};
