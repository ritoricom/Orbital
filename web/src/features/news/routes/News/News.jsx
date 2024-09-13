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
import { useNews, NewsCard, NewsCardGrid } from "@/features/news";
import { useMediaQuery } from "@/lib/media";
import { getPromoImgByCity } from "@/utils/promo";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import styles from "./News.module.css";

export const News = ({ contacts }) => {
  const { t } = useTranslation("news", {
    keyPrefix: "routes.news",
  });
  const { locale } = useRouter();
  const { city } = useCity();
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const { isFetchingNextPage, hasNextPage, data, fetchNextPage } = useNews({
    lang: locale,
    city,
  });

  const news = mergePagesFromPaginated(data.pages);

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
            <BreadcrumbsLink href={`/${city}/news`} disabled>
              {t("title")}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container>
          <div className={styles.newsInner}>
            {isEmptyArray(news) ? (
              <NoData />
            ) : (
              <>
                <NewsCardGrid>
                  {news.map((newsArticle) => (
                    <NewsCard key={newsArticle.id} news={newsArticle} />
                  ))}
                </NewsCardGrid>
                {hasNextPage && (
                  <Button
                    fullWidth
                    uppercase
                    size="xl"
                    color="secondaryDark"
                    disabled={isFetchingNextPage}
                    className={styles.newsLoadMoreBtn}
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
