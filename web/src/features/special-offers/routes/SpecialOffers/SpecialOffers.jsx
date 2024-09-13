import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { SEO } from "@/lib/meta";
import { BookingPanel } from "@/lib/bnovo";
import { mergePagesFromPaginated } from "@/lib/react-query";
import { NoData, BreadcrumbsLink } from "@/ui/data-display";
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
import { Button } from "@/ui/inputs";
import { isEmptyArray } from "@/utils/equals";
import {
  useCity,
  CityNavbar,
  SelfCityLink,
  StickyCityNavbar,
} from "@/features/cities";
import {
  useSpecialOffers,
  SpecialOfferCard,
  SpecialOfferCardGrid,
} from "@/features/special-offers";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import { getPromoImgByCity } from "@/utils/promo";
import styles from "./SpecialOffers.module.css";

export const SpecialOffers = ({ contacts }) => {
  const { t } = useTranslation("special-offers", {
    keyPrefix: "routes.specialOffers",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const { locale } = useRouter();

  const { city } = useCity();

  const { isFetchingNextPage, hasNextPage, data, fetchNextPage } =
    useSpecialOffers({
      lang: locale,
    });

  const specialOffers = mergePagesFromPaginated(data.pages);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <>
      <SEO title={t("metaTitle")} />
      <Promo img={getPromoImgByCity(city)}>
        <Header>
          <HeaderContent contacts={contacts} />
        </Header>
        <StickyHeader>
          <StickyCityNavbar />
        </StickyHeader>
        <CityNavbar />
        <PromoContent desktopCenter={!isTablet} spacing="xs">
          <PromoTitle
            order={!isTablet ? 1 : 2}
            hasWidthLimit={false}
            className={styles.specialOfferTitle}
          >
            {t("title")}
          </PromoTitle>
          <PromoBreadcrumbs>
            <SelfCityLink />
            <BreadcrumbsLink href={`/${city}/special-offers`} disabled>
              {t("title")}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container>
          <div className={styles.specialOffersInner}>
            {isEmptyArray(specialOffers) ? (
              <NoData />
            ) : (
              <>
                <SpecialOfferCardGrid>
                  {specialOffers.map((specialOffer) => (
                    <SpecialOfferCard
                      key={specialOffer.id}
                      specialOffer={specialOffer}
                    />
                  ))}
                </SpecialOfferCardGrid>
                {hasNextPage && (
                  <Button
                    fullWidth
                    uppercase
                    size={isTablet ? "m" : "xl"}
                    color="secondaryDark"
                    disabled={isFetchingNextPage}
                    className={styles.specialOffersLoadMoreBtn}
                    onClick={handleLoadMore}
                  >
                    {t("loadMore")}
                  </Button>
                )}
              </>
            )}
          </div>
        </Container>
      </Main>
      <Footer>
        <FooterContacts contacts={contacts} />
      </Footer>
    </>
  );
};
