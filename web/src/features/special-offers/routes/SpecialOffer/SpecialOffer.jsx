import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

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
import { SmartImageSlider } from "@/features/images";
import {
  CityNavbar,
  SelfCityLink,
  useCity,
  StickyCityNavbar,
} from "@/features/cities";
import {
  OtherSpecialOffers,
  SpecialOfferPaper,
} from "@/features/special-offers";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";
import { getPromoImgByCity } from "@/utils/promo";

import styles from "./SpecialOffer.module.css";

export const SpecialOffer = ({
  specialOffer,
  nestedSpecialOffers,
  contacts,
}) => {
  const { t } = useTranslation("special-offers", {
    keyPrefix: "routes.specialOffer",
  });

  const { city } = useCity();
  const { asPath } = useRouter();

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <>
      <SEO title={specialOffer.title} />
      <Promo img={getPromoImgByCity(city)}>
        <Header>
          <HeaderContent contacts={contacts} />
        </Header>
        <StickyHeader>
          <StickyCityNavbar />
        </StickyHeader>
        <CityNavbar />
        <PromoContent desktopCenter spacing="xs">
          <PromoTitle order={isTablet ? 2 : 1} hasWidthLimit={false}>
            {t("specialOffers")}
          </PromoTitle>
          <PromoBreadcrumbs>
            <SelfCityLink />
            <BreadcrumbsLink href={`/${city}/special-offers`}>
              {t("specialOffers")}
            </BreadcrumbsLink>
            <BreadcrumbsLink href={asPath} disabled>
              {specialOffer.title}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container className={styles.specialOfferContainer}>
          <div className={styles.specialOfferInner}>
            <div className={styles.specialOfferInfo}>
              <SmartImageSlider
                images={specialOffer.images}
                className={styles.specialOfferSlider}
                imgClassName={styles.specialOfferSliderImg}
              />

              <SpecialOfferPaper
                title={specialOffer.title}
                description={specialOffer.description}
                note={specialOffer.note}
                primaryPhone={specialOffer.primaryPhone}
                secondaryPhone={specialOffer.secondaryPhone}
              />
            </div>
            <OtherSpecialOffers specialOffers={nestedSpecialOffers} />
          </div>
        </Container>
      </Main>
      <Footer>
        <FooterContacts contacts={contacts} />
      </Footer>
    </>
  );
};

SpecialOffer.propTypes = {
  specialOffer: PropTypes.object.isRequired,
  nestedSpecialOffers: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
};
