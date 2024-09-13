import { ThemeOptionsComponents } from "./index";

export const MuiButton: ThemeOptionsComponents["MuiButton"] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      boxShadow: "none",
      fontWeight: 700,
      fontSize: "14px",
      lineHeight: "170%",
      "&:hover": {
        boxShadow: "none",
      },
      ...(ownerState.color === "primary" && {
        color: theme.palette.common.white,
      }),
      ...(ownerState.color === "secondary" && {
        color: "#726B5D",
      }),
      ...(ownerState.size === "medium" && {
        padding: "10px 22px",
      }),
    }),
  },
};
