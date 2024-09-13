import { SEO } from "@/lib/meta";
import { BreadcrumbsLink } from "@/ui/data-display";
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
import { useTranslation } from "next-i18next";
import { BookingPanel } from "@/lib/bnovo";
import { Button } from "@/ui/inputs";
import { isEmptyArray } from "@/utils/equals";
import { NoData } from "@/ui/data-display";
import { mergePagesFromPaginated } from "@/lib/react-query";
import { useLeisures } from "@/features/leisures";
import { useMediaQuery } from "@/lib/media";
import { CityNavbar, SelfCityLink, StickyCityNavbar } from "@/features/cities";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { LeisureCard, LeisureCardGrid } from "@/features/leisures";

import promoImg from "@/assets/images/obn/promo.jpg";
import styles from "./Leisures.module.css";

export const Leisures = ({ contacts }) => {
  const { t } = useTranslation("leisures", {
    keyPrefix: "routes.leisures",
  });
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const { isFetchingNextPage, hasNextPage, data, fetchNextPage } =
    useLeisures();

  const leisures = mergePagesFromPaginated(data.pages);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <>
      <SEO title={t("title")} />
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
            <BreadcrumbsLink href={`/obn/leisures`} disabled>
              {t("title")}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container>
          <div className={styles.leisures}>
            {isEmptyArray(leisures) ? (
              <NoData />
            ) : (
              <>
                <LeisureCardGrid>
                  {leisures.map((leisure) => (
                    <LeisureCard key={leisure.id} leisure={leisure} />
                  ))}
                </LeisureCardGrid>
                {hasNextPage && (
                  <Button
                    fullWidth
                    uppercase
                    size={isTablet ? "m" : "xl"}
                    color="secondaryDark"
                    disabled={isFetchingNextPage}
                    className={styles.leisuresLoadMoreBtn}
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
