import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getLeisure, Leisure } from "@/features/leisures";
import { getContacts } from "@/features/contacts";

import { proxyError } from "@/utils/proxy-error";

const LeisurePage = ({ leisureWithNested, contacts }) => (
  <Leisure
    contacts={contacts}
    leisure={leisureWithNested.self}
    nestedLeisures={leisureWithNested.nested}
  />
);

export const getServerSideProps = async ({ query }) => {
  try {
    const leisureWithNested = await getLeisure({
      leisureID: query.leisureID,
    });

    const contacts = await getContacts({
      city: "obn",
      lang: "ru",
    });

    const locales = await serverSideTranslations("ru", [
      "common",
      "cities",
      "leisures",
      "search",
    ]);

    return {
      props: {
        leisureWithNested,
        contacts,
        ...locales,
      },
    };
  } catch (err) {
    return proxyError(err);
  }
};

export default LeisurePage;
