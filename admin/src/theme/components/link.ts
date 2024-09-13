import { ThemeOptionsComponents } from ".";

export const MuiLink: ThemeOptionsComponents["MuiLink"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.primary,
    }),
  },
};
