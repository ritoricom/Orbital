import { getServerSideSitemapIndex } from "next-sitemap";

import { withAll } from "@/lib/api";
import { APP_URL } from "@/config/app";
import { DEFAULT_LOCALE } from "@/config/locales";
import { noopFn } from "@/utils/noop";
import { getRooms } from "@/features/rooms";

const getAllRoomsByLangAndCity = ({ lang, city }) =>
  withAll((pageSize) =>
    getRooms({
      lang,
      city,
      page: 0,
      pageSize,
    })
  );

const getRootSitemap = ({ locale, city }) => {
  const prefixLocale = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return `${APP_URL}${prefixLocale}/${city}/rooms`;
};

const getSitemapByRoomID = ({ locale, city, roomID }) => {
  const prefixLocale = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return `${APP_URL}${prefixLocale}/${city}/rooms/${roomID}`;
};

export const getServerSideProps = async (ctx) => {
  const {
    locale,
    query: { city },
  } = ctx;

  const allRooms = await getAllRoomsByLangAndCity({
    city,
    lang: locale,
  });

  const sitemaps = [
    getRootSitemap({ locale, city }),
    ...allRooms.map((room) =>
      getSitemapByRoomID({ locale, city, roomID: room.id })
    ),
  ];

  return getServerSideSitemapIndex(ctx, sitemaps);
};

export default noopFn;
