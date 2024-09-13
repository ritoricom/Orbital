import { Leisures } from "@/features/leisures";
import { getContacts } from "@/features/contacts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { serde } from "@/lib/react-query";
import { dehydrate } from "@tanstack/react-query";
import { prefetchLeisures } from "@/features/leisures";

const LeisurePage = ({ contacts }) => <Leisures contacts={contacts} />;

export const getServerSideProps = async () => ({
  props: {
    dehydratedState: serde(dehydrate(await prefetchLeisures())),
    contacts: await getContacts({
      city: "obn",
      lang: "ru",
    }),
    ...(await serverSideTranslations("ru", [
      "common",
      "cities",
      "leisures",
      "search",
    ])),
  },
});

export default LeisurePage;
