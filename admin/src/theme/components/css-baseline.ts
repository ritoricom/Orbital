import rosatomLightWoff2 from "@/assets/fonts/rosatom/light.woff2";
import rosatomRegularWoff2 from "@/assets/fonts/rosatom/regular.woff2";
import rosatomBoldWoff2 from "@/assets/fonts/rosatom/bold.woff2";

import { ThemeOptionsComponents } from "./";

export const MuiCssBaseline: ThemeOptionsComponents["MuiCssBaseline"] = {
  styleOverrides: `
    @font-face {
      font-family: "Rosatom";
      src: url(${rosatomLightWoff2});
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Rosatom";
      src: url(${rosatomRegularWoff2});
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Rosatom";
      src: url(${rosatomBoldWoff2});
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    body {
      max-width: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  `,
};
