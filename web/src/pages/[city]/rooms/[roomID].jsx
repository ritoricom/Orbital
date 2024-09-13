import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getRoom, getRooms, Room } from "@/features/rooms";
import { withAll } from "@/lib/api";

import { getContacts } from "@/features/contacts";

import { proxyError } from "@/utils/proxy-error";

const RoomPage = ({ room, rooms, contacts }) => (
  <Room room={room} rooms={rooms} contacts={contacts} />
);

export const getServerSideProps = async ({ query, locale }) => {
  {
    try {
      const room = await getRoom({
        roomID: query.roomID,
        lang: locale,
      });

      const rooms = await withAll((pageSize) =>
        getRooms({
          city: query.city,
          lang: locale,
          page: 0,
          pageSize,
        })
      );

      const contacts = await getContacts({
        lang: locale,
        city: query.city,
      });

      const locales = await serverSideTranslations(locale, [
        "common",
        "cities",
        "rooms",
        "search",
      ]);

      return {
        props: {
          room,
          rooms,
          contacts,
          ...locales,
        },
      };
    } catch (err) {
      return proxyError(err);
    }
  }
};

export default RoomPage;
