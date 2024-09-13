import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAll } from "@/lib/api";
import { getSpecialOffers } from "@/features/special-offers";
import { getRooms } from "@/features/rooms";
import { getHotelImages } from "@/features/images";
import { getContacts } from "@/features/contacts";
import { MainObn } from "@/features/cities";

import { proxyError } from "@/utils/proxy-error";

const MainObnPage = ({ specialOffers, rooms, photos, contacts }) => (
  <MainObn
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
      city: "obn",
    });

    const rooms = await withAll((pageSize) =>
      getRooms({
        lang: locale,
        city: "obn",
        page: 0,
        pageSize,
      })
    );

    const photos = await getHotelImages({
      city: "obn",
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

export default MainObnPage;
