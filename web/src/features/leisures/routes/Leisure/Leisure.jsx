import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { SEO } from "@/lib/meta";
import { BookingPanel } from "@/lib/bnovo";
import {
  Container,
  Footer,
  FooterContacts,
  Header,
  Main,
  Promo,
  PromoBreadcrumbs,
  PromoContent,
  PromoTitle,
  StickyHeader,
  HeaderContent,
} from "@/ui/layout";
import { BreadcrumbsLink } from "@/ui/data-display";
import {
  CityNavbar,
  SelfCityLink,
  useCity,
  StickyCityNavbar,
} from "@/features/cities";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { SmartImageSlider } from "@/features/images";
import { LeisurePaper, OtherLeisures } from "@/features/leisures";

import promoImg from "@/assets/images/obn/promo.jpg";
import styles from "./Leisure.module.css";

export const Leisure = ({ contacts, leisure, nestedLeisures }) => {
  const { t } = useTranslation("leisures", {
    keyPrefix: "routes.leisure",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const { city } = useCity();
  const { asPath } = useRouter();

  return (
    <>
      <SEO title={leisure.title} />
      <Promo img={promoImg}>
        <Header>
          <HeaderContent contacts={contacts} />
        </Header>
        <StickyHeader>
          <StickyCityNavbar />
        </StickyHeader>
        <CityNavbar />
        <PromoContent desktopCenter spacing="xs">
          <PromoTitle order={isTablet ? 2 : 1} hasWidthLimit={false}>
            {t("title")}
          </PromoTitle>
          <PromoBreadcrumbs>
            <SelfCityLink />
            <BreadcrumbsLink href={`/${city}/leisures`}>
              {t("title")}
            </BreadcrumbsLink>
            <BreadcrumbsLink href={asPath} disabled>
              {leisure.title}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container className={styles.leisureContainer}>
          <div className={styles.leisureInner}>
            <div className={styles.leisureInfo}>
              <SmartImageSlider
                images={leisure.images}
                className={styles.leisureSlider}
              />
              <LeisurePaper
                title={leisure.title}
                route={leisure.route}
                description={leisure.description}
                note={leisure.note}
                phoneNumber={leisure.phone}
                email={leisure.email}
                days={leisure.days}
              />
            </div>
            <OtherLeisures
              leisures={nestedLeisures}
              className={styles.leisureOtherLeisure}
            />
          </div>
        </Container>
      </Main>
      <Footer>
        <FooterContacts contacts={contacts} />
      </Footer>
    </>
  );
};
