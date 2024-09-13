import { useTranslation } from "next-i18next";

import { SEO } from "@/lib/meta";
import { BookingPanel } from "@/lib/bnovo";
import {
  Footer,
  FooterContacts,
  Header,
  Promo,
  PromoContent,
  PromoTitle,
  PromoSubtitle,
  Main,
  StickyHeader,
  HeaderContent,
} from "@/ui/layout";
import {
  CityNavbar,
  Welcome,
  HistoryHotel,
  CallMeBack,
  HotelPhotos,
  HotelRooms,
  SpecialForYou,
  StickyCityNavbar,
  WelcomeText,
  Stars,
} from "@/features/cities";
import { useMediaQuery } from "@/lib/media";

import desktopMapImgRu from "@/assets/images/obn/map-desktop-ru.png";
import tabletMapImgRu from "@/assets/images/obn/map-tablet-ru.png";
import mobileMapImgRu from "@/assets/images/obn/map-mobile-ru.png";
import desktopMapImgEn from "@/assets/images/obn/map-desktop-en.png";
import tabletMapImgEn from "@/assets/images/obn/map-tablet-en.png";
import mobileMapImgEn from "@/assets/images/obn/map-mobile-en.png";
import obnImg from "@/assets/images/obn/card.png";
import promoImg from "@/assets/images/obn/promo.jpg";
import callBackImg from "@/assets/images/obn/call-me-back.jpg";

export const MainObn = ({ specialOffers, rooms, photos, contacts }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "routes.mainObn",
  });

  const isLaptop = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      <SEO title={t("metaTitle")} />
      <Promo img={promoImg}>
        <Header>
          <HeaderContent contacts={contacts} />
        </Header>
        <StickyHeader>
          <StickyCityNavbar />
        </StickyHeader>
        <CityNavbar />
        <PromoContent spacing="l">
          <Stars value={3} />
          <PromoTitle hasWidthLimit>{t("title")}</PromoTitle>
          <PromoSubtitle>{t("subtitle")}</PromoSubtitle>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Welcome
          desktopMapImg={{ ru: desktopMapImgRu, en: desktopMapImgEn }}
          tabletMapImg={{ ru: tabletMapImgRu, en: tabletMapImgEn }}
          mobileMapImg={{ ru: mobileMapImgRu, en: mobileMapImgEn }}
          cardImg={obnImg}
        >
          <WelcomeText>{t("welcome.text1")}</WelcomeText>
          <WelcomeText>{t("welcome.text2")}</WelcomeText>
          <WelcomeText>{t("welcome.text3")}</WelcomeText>
          <WelcomeText>{t("welcome.text4")}</WelcomeText>
          <WelcomeText>{t("welcome.text5")}</WelcomeText>
        </Welcome>
        <HotelRooms rooms={rooms} />
        {!isLaptop && (
          <HistoryHotel
            description={t("historyHotel.description")}
            timelines={[
              { text: t("historyHotel.first"), year: 1975 },
              { text: t("historyHotel.second"), year: 2017 },
              { text: t("historyHotel.third"), year: 2020 },
            ]}
          />
        )}
        {!isLaptop && (
          <SpecialForYou
            description={t("specialForYou.description")}
            specialOffers={specialOffers}
          />
        )}
        <CallMeBack backImg={callBackImg}>
          {t("callMeBack.description")}
        </CallMeBack>
        <HotelPhotos photos={photos} />
      </Main>
      <Footer>
        <FooterContacts contacts={contacts} />
      </Footer>
    </>
  );
};
