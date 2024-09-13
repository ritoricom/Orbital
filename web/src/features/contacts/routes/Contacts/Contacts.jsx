import { useTranslation } from "next-i18next";
import {
  CityNavbar,
  SelfCityLink,
  StickyCityNavbar,
  useCity,
} from "@/features/cities";
import { SEO } from "@/lib/meta";
import { BookingPanel } from "@/lib/bnovo";
import { YandexMap } from "@/lib/react-map-display";
import {
  Container,
  Footer,
  FooterContacts,
  Header,
  Main,
  Promo,
  PromoContent,
  PromoTitle,
  PromoBreadcrumbs,
  StickyHeader,
  HeaderContent,
} from "@/ui/layout";
import { Title, BreadcrumbsLink } from "@/ui/data-display";
import { CallMeBackForm } from "@/features/misc";
import { ContactsDisplay } from "@/features/contacts";
import { useMediaQuery } from "@/lib/media";
import { M_BREAKPOINT_DOWN, L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import promoImgSpb from "@/assets/images/spb/alternative-promo.jpg";
import promoImgObn from "@/assets/images/obn/alternative-promo.jpg";
import promoImgNvz from "@/assets/images/nvz/alternative-promo.jpg";
import styles from "./Contacts.module.css";

export const Contacts = ({ contacts }) => {
  const { t } = useTranslation("contacts", {
    keyPrefix: "routes.contacts",
  });

  const isMobile = useMediaQuery(M_BREAKPOINT_DOWN);
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const { city } = useCity();

  const getAlternativePromoImgByCity = () => {
    switch (city) {
      case "obn":
        return promoImgObn;
      case "nvz":
        return promoImgNvz;
      case "spb":
      default:
        return promoImgSpb;
    }
  };

  return (
    <>
      <SEO title={t("metaTitle")} />
      <Promo img={getAlternativePromoImgByCity()}>
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
            <BreadcrumbsLink href={`/${city}/contacts`} disabled>
              {t("title")}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container className={styles.contactsContainer}>
          {!isMobile ? (
            <div className={styles.contactsWrapper}>
              <div className={styles.contactsMap}>
                <YandexMap
                  center={contacts.coordinates}
                  coordinates={[contacts.coordinates]}
                  width="100%"
                  height="100%"
                  zoom={17}
                />
              </div>
              <div className={styles.contactsWindow}>
                <div className={styles.contactsWrapperForm}>
                  <Title order={4} className={styles.contactsTitleDisplay}>
                    {t("titleForm")}
                  </Title>
                  <ContactsDisplay contacts={contacts} />
                  <Title order={4} className={styles.contactsTitleForm}>
                    {t("contactUs")}
                  </Title>
                  <CallMeBackForm />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.contactsWrapperMobile}>
              <Title order={3} className={styles.contactsTitleDisplay}>
                {t("titleForm")}
              </Title>
              <ContactsDisplay
                contacts={contacts}
                className={styles.contactsDisplay}
              />
              <div className={styles.contactsMapMobile}>
                <YandexMap
                  center={contacts.coordinates}
                  coordinates={[contacts.coordinates]}
                  width="100%"
                  height="357px"
                  zoom={17}
                />
              </div>
              <div className={styles.contactsTitleAndForm}>
                <Title order={3} className={styles.contactsTitleForm}>
                  {t("contactUs")}
                </Title>
                <CallMeBackForm />
              </div>
            </div>
          )}
        </Container>
      </Main>
      <Footer>
        <FooterContacts contacts={contacts} />
      </Footer>
    </>
  );
};
