import PropTypes from "prop-types";
import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Link } from "@/ui/navigation";

import styles from "./CityLinks.module.css";

export const CityLinks = ({ className }) => {
  const { asPath } = useRouter();
  const { t } = useTranslation("common", {
    keyPrefix: "components.layout.cityLinks",
  });

  return (
    <div className={clsx(styles.cityLinksContainer, className)}>
      <NextLink passHref href="/spb">
        <Link uppercase size="s" active={asPath.startsWith("/spb")}>
          {t("spb")}
        </Link>
      </NextLink>
      <NextLink passHref href="/obn">
        <Link uppercase size="s" active={asPath.startsWith("/obn")}>
          {t("obn")}
        </Link>
      </NextLink>
      <NextLink passHref href="/nvz">
        <Link uppercase size="s" active={asPath.startsWith("/nvz")}>
          {t("nvz")}
        </Link>
      </NextLink>
    </div>
  );
};

CityLinks.propTypes = {
  className: PropTypes.string,
};
