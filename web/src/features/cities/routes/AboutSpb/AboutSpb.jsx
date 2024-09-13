import { useTranslation } from "next-i18next";

import { SEO } from "@/lib/meta";
import { BookingPanel } from "@/lib/bnovo";
import {
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
import {
  CityNavbar,
  SelfCityLink,
  AboutUs,
  AboutCafe,
  HotelReviews,
  RoomsFund,
  Location,
  StickyCityNavbar,
} from "@/features/cities";
import { BreadcrumbsLink } from "@/ui/data-display";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import aboutImg from "@/assets/images/spb/alternative-promo.jpg";
import cafeImg1 from "@/assets/images/spb/cafe-1.jpg";
import cafeImg2 from "@/assets/images/spb/cafe-2.jpg";
import cafeImg3 from "@/assets/images/spb/cafe-3.jpg";
import cafeImg4 from "@/assets/images/spb/cafe-4.jpg";

export const AboutSpb = ({ reviews, rooms, contacts }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "routes.aboutSpb",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <>
      <SEO title={t("metaTitle")} />
      <Promo img={aboutImg}>
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
            <BreadcrumbsLink href={`/spb/hotel`} disabled>
              {t("title")}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <AboutUs
          text={[t("aboutUs.text1"), t("aboutUs.text2")]}
          img={{ src: aboutImg, alt: "alt" }}
        />
        <AboutCafe
          text={[t("aboutCafe.text1"), t("aboutCafe.text2")]}
          images={[
            { url: cafeImg1, alt: "alt" },
            { url: cafeImg2, alt: "alt" },
            { url: cafeImg3, alt: "alt" },
            { url: cafeImg4, alt: "alt" },
          ]}
        />
        <HotelReviews reviews={reviews} />
        <RoomsFund rooms={rooms} />
        <Location contacts={contacts} />
      </Main>
      <Footer>
        <FooterContacts contacts={contacts} />
      </Footer>
    </>
  );
};
