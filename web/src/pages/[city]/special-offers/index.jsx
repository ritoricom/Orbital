import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate } from "@tanstack/react-query";
import { getContacts } from "@/features/contacts";
import { serde } from "@/lib/react-query";
import {
  prefetchSpecialOffers,
  SpecialOffers,
} from "@/features/special-offers";

const SpecialOffersPage = ({ contacts }) => (
  <SpecialOffers contacts={contacts} />
);

export const getServerSideProps = async ({ locale, query }) => ({
  props: {
    dehydratedState: serde(
      dehydrate(
        await prefetchSpecialOffers({
          lang: locale,
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
      "special-offers",
      "search",
    ])),
  },
});

export default SpecialOffersPage;
