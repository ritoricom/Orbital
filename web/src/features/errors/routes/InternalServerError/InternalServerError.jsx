import { useTranslation } from "next-i18next";
import { BookingPanel } from "@/lib/bnovo";
import { SEO } from "@/lib/meta";
import {
  Container,
  Footer,
  Header,
  Main,
  Promo,
  PromoContent,
  PromoTitle,
} from "@/ui/layout";
import { ErrorInfo } from "@/features/errors";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import promoImg from "@/assets/images/spb/promo.jpg";

export const InternalServerError = () => {
  const { t } = useTranslation("errors", {
    keyPrefix: "routes.internalServerError",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <>
      <SEO title={t("title")} />
      <Promo img={promoImg}>
        <Header />
        <PromoContent desktopCenter spacing={isTablet ? "xs" : "s"}>
          <PromoTitle order={isTablet ? 2 : 1} hasWidthLimit={false}>
            {t("title")}
          </PromoTitle>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container>
          <ErrorInfo hasReturnAction statusCode={500} message={t("title")} />
        </Container>
      </Main>
      <Footer chooseCity={false} />
    </>
  );
};
