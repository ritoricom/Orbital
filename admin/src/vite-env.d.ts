/// <reference types="vite/client" />

import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    textL: React.CSSProperties;
    textM: React.CSSProperties;
    textS: React.CSSProperties;
    textXs: React.CSSProperties;
    textBoldL: React.CSSProperties;
    textBoldM: React.CSSProperties;
    textBoldS: React.CSSProperties;
    textBoldXs: React.CSSProperties;
    textUpL: React.CSSProperties;
    textUpM: React.CSSProperties;
    textUpS: React.CSSProperties;
    textUpXs: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    textL?: React.CSSProperties;
    textM?: React.CSSProperties;
    textS?: React.CSSProperties;
    textXs?: React.CSSProperties;
    textBoldL?: React.CSSProperties;
    textBoldM?: React.CSSProperties;
    textBoldS?: React.CSSProperties;
    textBoldXs?: React.CSSProperties;
    textUpL?: React.CSSProperties;
    textUpM?: React.CSSProperties;
    textUpS?: React.CSSProperties;
    textUpXs?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    textL: true;
    textM: true;
    textS: true;
    textXs: true;
    textBoldL: true;
    textBoldM: true;
    textBoldS: true;
    textBoldXs: true;
    textUpL: true;
    textUpM: true;
    textUpS: true;
    textUpXs: true;
  }
}
