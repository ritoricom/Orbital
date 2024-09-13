import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { InDeveloping } from "@/features/misc";

const HotelRulesObnPage = () => <InDeveloping />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "misc", "search"])),
  },
});

export default HotelRulesObnPage;
