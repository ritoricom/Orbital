import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { InDeveloping } from "@/features/misc";

const HotelRulesNvzPage = () => <InDeveloping />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "misc", "search"])),
  },
});

export default HotelRulesNvzPage;
