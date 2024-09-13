import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAll } from "@/lib/api";
import { getSpecialOffers } from "@/features/special-offers";
import { getRooms } from "@/features/rooms";
import { getHotelImages } from "@/features/images";
import { getContacts } from "@/features/contacts";
import { MainSpb } from "@/features/cities";

import { proxyError } from "@/utils/proxy-error";

const MainSpbPage = ({ specialOffers, rooms, photos, contacts }) => (
  <MainSpb
    rooms={rooms}
    specialOffers={specialOffers}
    photos={photos}
    contacts={contacts}
  />
);

export const getServerSideProps = async ({ locale }) => {
  try {
    const specialOffers = await getSpecialOffers({
      lang: locale,
      page: 0,
      pageSize: 2,
    }).then(({ items }) => items);

    const contacts = await getContacts({
      lang: locale,
      city: "spb",
    });

    const rooms = await withAll((pageSize) =>
      getRooms({
        lang: locale,
        city: "spb",
        page: 0,
        pageSize,
      })
    );

    const photos = await getHotelImages({
      city: "spb",
    }).then(({ items }) => items);

    const locales = await serverSideTranslations(locale, [
      "common",
      "cities",
      "misc",
      "search",
    ]);

    return {
      props: {
        specialOffers,
        contacts,
        rooms,
        photos,
        ...locales,
      },
    };
  } catch (err) {
    return proxyError(err);
  }
};
export default MainSpbPage;
