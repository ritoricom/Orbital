import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getContacts } from "@/features/contacts";
import { getNewsArticle, NewsArticle } from "@/features/news";

import { proxyError } from "@/utils/proxy-error";

const NewsArticlePage = ({ newsWithNested, contacts }) => (
  <NewsArticle
    news={newsWithNested.self}
    nestedNews={newsWithNested.nested}
    contacts={contacts}
  />
);

export const getServerSideProps = async ({ query, locale }) => {
  try {
    const newsWithNested = await getNewsArticle({
      newsID: query.newsID,
      lang: locale,
      city: query.city,
    });

    const contacts = await getContacts({
      lang: locale,
      city: query.city,
    });

    const locales = await serverSideTranslations(locale, [
      "common",
      "cities",
      "news",
      "search",
    ]);

    return {
      props: {
        newsWithNested,
        contacts,
        ...locales,
      },
    };
  } catch (err) {
    return proxyError(err);
  }
};

export default NewsArticlePage;
