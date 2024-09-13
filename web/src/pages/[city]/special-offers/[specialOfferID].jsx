import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getSpecialOffer, SpecialOffer } from "@/features/special-offers";

import { getContacts } from "@/features/contacts";

import { proxyError } from "@/utils/proxy-error";

const SpecialOfferPage = ({ specialOfferWithNested, contacts }) => (
  <SpecialOffer
    specialOffer={specialOfferWithNested.self}
    nestedSpecialOffers={specialOfferWithNested.nested}
    contacts={contacts}
  />
);

export const getServerSideProps = async ({ query, locale }) => {
  {
    try {
      const specialOfferWithNested = await getSpecialOffer({
        specialOfferID: query.specialOfferID,
        lang: locale,
      });

      const contacts = await getContacts({
        lang: locale,
        city: query.city,
      });
      const locales = await serverSideTranslations(locale, [
        "common",
        "cities",
        "special-offers",
        "search",
      ]);
      return {
        props: {
          specialOfferWithNested,
          contacts,
          ...locales,
        },
      };
    } catch (err) {
      return proxyError(err);
    }
  }
};

export default SpecialOfferPage;
