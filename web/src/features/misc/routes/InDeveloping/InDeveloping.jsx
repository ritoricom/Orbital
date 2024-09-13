import { useTranslation } from "next-i18next";

import { SEO } from "@/lib/meta";
import { BookingPanel } from "@/lib/bnovo";
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

import promoImg from "@/assets/images/primary-promo.jpg";

export const InDeveloping = () => {
  const { t } = useTranslation("misc", {
    keyPrefix: "routes.inDeveloping",
  });

  return (
    <>
      <SEO title={t("metaTitle")} />
      <Promo img={promoImg}>
        <Header />
        <PromoContent desktopCenter spacing="s">
          <PromoTitle hasWidthLimit={false}>{t("title")}</PromoTitle>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container>
          <ErrorInfo statusCode={404} message={t("errorMessage")} />
        </Container>
      </Main>
      <Footer />
    </>
  );
};
