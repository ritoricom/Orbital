import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { InternalServerError } from "@/features/errors";

const InternalServerErrorPage = () => <InternalServerError />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "errors"])),
  },
});

export default InternalServerErrorPage;
