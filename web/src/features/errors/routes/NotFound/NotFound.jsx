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
import { SearchButton } from "@/ui/inputs";

import promoImg from "@/assets/images/spb/promo.jpg";

export const NotFound = () => {
  const { t } = useTranslation("errors", {
    keyPrefix: "routes.notFound",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <>
      <SEO title={t("metaTitle")} />
      <Promo img={promoImg}>
        <Header>
          <SearchButton />
        </Header>
        <PromoContent desktopCenter spacing="s">
          <PromoTitle order={isTablet ? 2 : 1} hasWidthLimit={false}>
            {t("title")}
          </PromoTitle>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container>
          <ErrorInfo
            hasReturnAction
            statusCode={404}
            message={t("errorMessage")}
          />
        </Container>
      </Main>
      <Footer chooseCity={false} />
    </>
  );
};
