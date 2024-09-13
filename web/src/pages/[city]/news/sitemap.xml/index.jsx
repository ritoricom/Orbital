import { getServerSideSitemapIndex } from "next-sitemap";

import { withAll } from "@/lib/api";
import { APP_URL } from "@/config/app";
import { DEFAULT_LOCALE } from "@/config/locales";
import { getNews } from "@/features/news";

const getAllNewsByLangAndCity = ({ lang, city }) =>
  withAll((pageSize) =>
    getNews({
      lang,
      city,
      page: 0,
      pageSize,
    })
  );

const getRootSitemap = ({ locale, city }) => {
  const prefixLocale = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return `${APP_URL}${prefixLocale}/${city}/news`;
};

const getSitemapByNewsID = ({ locale, city, newsID }) => {
  const prefixLocale = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return `${APP_URL}${prefixLocale}/${city}/news/${newsID}`;
};

export const getServerSideProps = async (ctx) => {
  const {
    locale,
    query: { city },
  } = ctx;

  const allNews = await getAllNewsByLangAndCity({
    city,
    lang: locale,
  });

  const sitemaps = [
    getRootSitemap({ locale, city }),
    ...allNews.map((news) =>
      getSitemapByNewsID({ locale, city, newsID: news.id })
    ),
  ];

  return getServerSideSitemapIndex(ctx, sitemaps);
};

export default function Sitemap() {}
