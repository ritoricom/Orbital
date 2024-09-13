import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { APP_URL } from "@/config/app";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/config/og";

export const SEO = ({ title }) => {
  const { t } = useTranslation("common", { keyPrefix: "lib.meta.seo" });
  const { asPath } = useRouter();

  const fullTitle = `${title} | ${t("postfixTitle")}`;

  const ogParams = new URLSearchParams({
    logo: t("logo"),
    title: t("postfixTitle"),
    subtitle: title,
  });

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={t("description")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${APP_URL}${asPath}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={t("description")} />
      {/* used api og handler */}
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta
        property="og:image"
        content={`${APP_URL}/api/og?${ogParams.toString()}`}
      />
    </Head>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
};
