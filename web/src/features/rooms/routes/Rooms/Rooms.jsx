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
import { useRooms, RoomCard, RoomCardGrid } from "@/features/rooms";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import { getPromoImgByCity } from "@/utils/promo";
import styles from "./Rooms.module.css";

export const Rooms = ({ contacts }) => {
  const { t } = useTranslation("rooms", {
    keyPrefix: "routes.rooms",
  });
  const { locale } = useRouter();
  const { city } = useCity();

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const { isFetchingNextPage, hasNextPage, data, fetchNextPage } = useRooms({
    lang: locale,
    city,
  });

  const rooms = mergePagesFromPaginated(data.pages);

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
        <PromoContent desktopCenter spacing="xs">
          <PromoTitle order={isTablet ? 2 : 1} hasWidthLimit={false}>
            {t("title")}
          </PromoTitle>
          <PromoBreadcrumbs>
            <SelfCityLink />
            <BreadcrumbsLink href={`/${city}/rooms`} disabled>
              {t("title")}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container>
          <div className={styles.roomsInner}>
            {isEmptyArray(rooms) ? (
              <NoData />
            ) : (
              <>
                <RoomCardGrid>
                  {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </RoomCardGrid>
                {hasNextPage && (
                  <Button
                    fullWidth
                    uppercase
                    size={isTablet ? "m" : "xl"}
                    color="secondaryDark"
                    disabled={isFetchingNextPage}
                    className={styles.roomsLoadMoreBtn}
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
