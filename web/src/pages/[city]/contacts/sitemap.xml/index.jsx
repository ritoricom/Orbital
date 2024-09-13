import { getServerSideSitemapIndex } from "next-sitemap";

import { APP_URL } from "@/config/app";
import { DEFAULT_LOCALE } from "@/config/locales";
import { noopFn } from "@/utils/noop";

const getSitemap = ({ locale, city }) => {
  const prefixLocale = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return `${APP_URL}${prefixLocale}/${city}/contacts`;
};

export const getServerSideProps = async (ctx) =>
  getServerSideSitemapIndex(ctx, [
    getSitemap({ locale: ctx.locale, city: ctx.query.city }),
  ]);

export default noopFn;
