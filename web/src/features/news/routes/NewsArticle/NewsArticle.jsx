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
import { useMediaQuery } from "@/lib/media";
import { getPromoImgByCity } from "@/utils/promo";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { NewsPaper, OtherNews } from "@/features/news";

import styles from "./NewsArticle.module.css";

export const NewsArticle = ({ news, nestedNews, contacts }) => {
  const { t } = useTranslation("news", {
    keyPrefix: "routes.newsArticle",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const { city } = useCity();
  const { asPath } = useRouter();

  return (
    <>
      <SEO title={news.title} />
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
            {t("news")}
          </PromoTitle>
          <PromoBreadcrumbs>
            <SelfCityLink />
            <BreadcrumbsLink href={`/${city}/news`}>
              {t("news")}
            </BreadcrumbsLink>
            <BreadcrumbsLink href={asPath} disabled>
              {news.title}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container className={styles.newsArticleContainer}>
          <div className={styles.newsArticleInner}>
            <div className={styles.newsArticleInfo}>
              <SmartImageSlider
                images={news.images}
                className={styles.newsArticleSlider}
              />

              <NewsPaper
                title={news.title}
                description={news.description}
                publicationAt={news.publicationAt}
              />
            </div>
            <OtherNews
              news={nestedNews}
              className={styles.newsArticleOtherNews}
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

NewsArticle.propTypes = {
  news: PropTypes.object.isRequired,
  nestedNews: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
