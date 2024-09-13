import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate } from "@tanstack/react-query";

import { serde } from "@/lib/react-query";
import { prefetchRooms, Rooms } from "@/features/rooms";

import { getContacts } from "@/features/contacts";

const RoomsPage = ({ contacts }) => <Rooms contacts={contacts} />;

export const getServerSideProps = async ({ query, locale }) => ({
  props: {
    dehydratedState: serde(
      dehydrate(
        await prefetchRooms({
          lang: locale,
          city: query.city,
        })
      )
    ),
    contacts: await getContacts({
      lang: locale,
      city: query.city,
    }),
    ...(await serverSideTranslations(locale, [
      "common",
      "cities",
      "rooms",
      "search",
    ])),
  },
});

export default RoomsPage;
