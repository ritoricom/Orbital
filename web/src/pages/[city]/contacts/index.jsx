import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Contacts } from "@/features/contacts";
import { getContacts } from "@/features/contacts";

const ContactsPage = ({ contacts }) => <Contacts contacts={contacts} />;

export const getServerSideProps = async ({ locale, query }) => ({
  props: {
    contacts: await getContacts({
      city: query.city,
      lang: locale,
    }),
    ...(await serverSideTranslations(locale, [
      "common",
      "cities",
      "contacts",
      "misc",
      "search",
    ])),
  },
});

export default ContactsPage;
