import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HotelRulesSpb } from "@/features/cities";

const HotelRulesSpbPage = () => <HotelRulesSpb />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "cities",
      "common",
      "misc",
      "search",
    ])),
  },
});

export default HotelRulesSpbPage;
