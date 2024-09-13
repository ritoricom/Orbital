import { ThemeOptionsComponents } from "./index";

export const MuiInputLabel: ThemeOptionsComponents["MuiInputLabel"] = {
  styleOverrides: {
    root: ({ ownerState }) => ({
      color: "#AAAAAA",
      transform: "translate(15px, 13px) scale(1)",
      ...(ownerState.shrink === true && {
        transform: "translate(15px, -10px) scale(0.75)",
      }),
    }),
  },
};
