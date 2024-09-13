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
  PromoSubtitle,
  PromoTitle,
  StickyHeader,
} from "@/ui/layout";
import { CityCardGrid, CityCard } from "@/features/cities";

import promoImg from "@/assets/images/primary-promo.jpg";
import spbImg from "@/assets/images/spb/cover.jpg";
import obnImg from "@/assets/images/obn/cover.jpg";
import nvzImg from "@/assets/images/nvz/cover.jpg";

export const ChooseCity = () => {
  const { t } = useTranslation("cities", {
    keyPrefix: "routes.chooseCity",
  });

  return (
    <>
      <SEO title={t("metaTitle")} />
      <Promo img={promoImg}>
        <Header />
        <StickyHeader withBurgerMenu={false} />
        <PromoContent spacing="m">
          <PromoTitle hasWidthLimit>{t("title")}</PromoTitle>
          <PromoSubtitle>{t("subtitle")}</PromoSubtitle>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container>
          <CityCardGrid>
            <CityCard name={t("spb")} href="/spb" img={spbImg} />
            <CityCard name={t("obn")} href="/obn" img={obnImg} />
            <CityCard name={t("nvz")} href="/nvz" img={nvzImg} />
          </CityCardGrid>
        </Container>
      </Main>
      <Footer chooseCity={false} />
    </>
  );
};
