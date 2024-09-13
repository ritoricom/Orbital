import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { Logo } from "@/ui/layout";
import { LoginForm } from "@/features/auth/ui/LoginForm";

import promoImg from "@/assets/images/promo.jpg";

export const Login: FC = () => (
  <>
    <SEO title="Вход" />
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 50%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "446px",
          }}
        >
          <Logo />
          <Typography
            variant="h3"
            component="h2"
            sx={{
              margin: "36px 0",
            }}
          >
            Вход в админ-панель
          </Typography>
          <LoginForm />
        </Box>
      </Box>
      <Box
        component="img"
        src={promoImg}
        alt="promo"
        sx={{ minWidth: "100%", maxHeight: "100vh", objectFit: "cover" }}
      />
    </Box>
  </>
);
