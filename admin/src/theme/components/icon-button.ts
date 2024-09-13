import { ThemeOptionsComponents } from ".";

export const MuiIconButton: ThemeOptionsComponents["MuiIconButton"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: "10px",
      color: theme.palette.text.primary,
    }),
  },
};
