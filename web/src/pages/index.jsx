import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ChooseCity } from "@/features/cities";

const HomePage = () => <ChooseCity />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "cities", "search"])),
  },
});

export default HomePage;
