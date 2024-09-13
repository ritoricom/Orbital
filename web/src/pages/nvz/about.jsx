import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAll } from "@/lib/api";
import { getReviews } from "@/features/reviews";
import { getRooms, ROOMS_PAGE_SIZE } from "@/features/rooms";
import { getContacts } from "@/features/contacts";
import { AboutNvz } from "@/features/cities";

import { proxyError } from "@/utils/proxy-error";

const AboutNvzPage = ({ reviews, rooms, contacts }) => (
  <AboutNvz reviews={reviews} rooms={rooms} contacts={contacts} />
);

export const getServerSideProps = async ({ locale }) => {
  try {
    const reviews = await withAll((pageSize) =>
      getReviews({
        lang: locale,
        city: "nvz",
        page: 0,
        pageSize,
      })
    );

    const rooms = await getRooms({
      lang: locale,
      city: "nvz",
      page: 0,
      pageSize: ROOMS_PAGE_SIZE,
    }).then(({ items }) => items);

    const contacts = await getContacts({
      lang: locale,
      city: "nvz",
    });

    const locales = await serverSideTranslations(locale, [
      "common",
      "cities",
      "misc",
      "search",
    ]);

    return {
      props: {
        reviews,
        rooms,
        contacts,
        ...locales,
      },
    };
  } catch (err) {
    return proxyError(err);
  }
};

export default AboutNvzPage;
