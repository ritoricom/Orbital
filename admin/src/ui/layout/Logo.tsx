import { FC } from "react";
import Typography from "@mui/material/Typography";

export const Logo: FC = () => (
  <Typography
    variant="h1"
    sx={{
      margin: 0,
      fontWeight: "700",
      fontSize: "22px",
      lineHeight: "140%",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#d1a96e",
    }}
  >
    орбиталь
  </Typography>
);
