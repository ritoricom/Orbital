import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { NotFound } from "@/features/errors";

const NotFoundPage = () => <NotFound />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "errors", "search"])),
  },
});

export default NotFoundPage;
