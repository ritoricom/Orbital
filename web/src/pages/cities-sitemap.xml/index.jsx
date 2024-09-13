import { getServerSideSitemapIndex } from "next-sitemap";

import { APP_URL } from "@/config/app";
import { DEFAULT_LOCALE } from "@/config/locales";
import { noopFn } from "@/utils/noop";
import { genByLocalesAndCities } from "@/utils/gen";

const indexSitemaps = ["contacts", "news", "rooms", "special-offers"];

const getSitemapIndex = ({ locale, city, sitemap }) => {
  const prefixLocale = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return `${APP_URL}${prefixLocale}/${city}/${sitemap}/sitemap.xml`;
};

const sitemaps = genByLocalesAndCities((locale, city) =>
  indexSitemaps.map((sitemap) => getSitemapIndex({ locale, city, sitemap }))
);

export const getServerSideProps = (ctx) =>
  getServerSideSitemapIndex(ctx, sitemaps);

export default noopFn;
