import { ThemeOptionsComponents } from ".";

export const MuiTableCell: ThemeOptionsComponents["MuiTableCell"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderColor: theme.palette.secondary.light,
    }),
    head: {
      color: "#726B5D",
    },
  },
};
