import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PrivacyPolicy } from "@/features/misc";

const PrivacyPolicyPage = () => <PrivacyPolicy />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "misc", "search"])),
  },
});

export default PrivacyPolicyPage;
