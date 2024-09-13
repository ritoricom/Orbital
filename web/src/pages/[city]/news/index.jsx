import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate } from "@tanstack/react-query";

import { serde } from "@/lib/react-query";
import { prefetchNews, News } from "@/features/news";
import { getContacts } from "@/features/contacts";

const NewsPage = ({ contacts }) => <News contacts={contacts} />;

export const getServerSideProps = async ({ query, locale }) => ({
  props: {
    dehydratedState: serde(
      dehydrate(
        await prefetchNews({
          lang: locale,
          city: query.city,
        })
      )
    ),
    contacts: await getContacts({
      city: query.city,
      lang: locale,
    }),
    ...(await serverSideTranslations(locale, [
      "common",
      "cities",
      "news",
      "search",
    ])),
  },
});

export default NewsPage;
