import { ThemeOptionsComponents } from ".";

export const MuiOutlinedInput: ThemeOptionsComponents["MuiOutlinedInput"] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      ...(ownerState.multiline && {
        padding: "13px 16px 14px",
      }),
      "& input.MuiInputBase-input": {
        padding: "13px 16px 14px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: 2,
        borderColor: theme.palette.secondary.main,
      },
      ...(!ownerState.error && {
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
        },
      }),
    }),
  },
};
