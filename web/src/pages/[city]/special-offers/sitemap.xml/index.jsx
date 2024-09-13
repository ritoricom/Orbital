import { getServerSideSitemapIndex } from "next-sitemap";

import { withAll } from "@/lib/api";
import { APP_URL } from "@/config/app";
import { DEFAULT_LOCALE } from "@/config/locales";
import { noopFn } from "@/utils/noop";
import { getSpecialOffers } from "@/features/special-offers";

const getAllSpecialOffersByLang = (lang) =>
  withAll((pageSize) =>
    getSpecialOffers({
      lang,
      page: 0,
      pageSize,
    })
  );

const getRootSitemap = ({ locale, city }) => {
  const prefixLocale = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return `${APP_URL}${prefixLocale}/${city}/special-offers`;
};

const getSitemapBySpecialOfferID = ({ locale, city, specialOfferID }) => {
  const prefixLocale = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return `${APP_URL}${prefixLocale}/${city}/special-offers/${specialOfferID}`;
};

export const getServerSideProps = async (ctx) => {
  const {
    locale,
    query: { city },
  } = ctx;

  const allSpecialOffers = await getAllSpecialOffersByLang(locale);

  const sitemaps = [
    getRootSitemap({ locale, city }),
    ...allSpecialOffers.map((specialOffer) =>
      getSitemapBySpecialOfferID({
        locale,
        city,
        specialOfferID: specialOffer.id,
      })
    ),
  ];

  return getServerSideSitemapIndex(ctx, sitemaps);
};

export default noopFn;
