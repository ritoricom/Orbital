import { ThemeOptionsComponents } from ".";

export const MuiPaginationItem: ThemeOptionsComponents["MuiPaginationItem"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.textM,
      height: "44px",
      padding: "9px 18px",
    }),
    previousNext: {
      padding: "9px 19px",
    },
  },
};
