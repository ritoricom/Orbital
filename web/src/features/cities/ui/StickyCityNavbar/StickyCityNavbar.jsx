import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Link } from "@/ui/navigation";
import { useCity } from "@/features/cities";

import styles from "./StickyCityNavbar.module.css";

export const StickyCityNavbar = ({ className }) => {
  const { asPath, locale } = useRouter();
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.cityNavbar",
  });

  const { city } = useCity();

  return (
    <nav className={clsx(styles.stickyCityNavbarInner, className)}>
      <NextLink passHref href={`/${city}/rooms`}>
        <Link
          uppercase
          size="m"
          color="dark"
          active={asPath.endsWith("/rooms")}
        >
          {t("rooms")}
        </Link>
      </NextLink>
      <NextLink passHref href={`/${city}/about`}>
        <Link
          uppercase
          size="m"
          color="dark"
          active={asPath.endsWith("/about")}
        >
          {t("about")}
        </Link>
      </NextLink>
      <NextLink passHref href={`/${city}/special-offers`}>
        <Link
          uppercase
          size="m"
          color="dark"
          active={asPath.endsWith("/special-offers")}
        >
          {t("specialOffers")}
        </Link>
      </NextLink>
      {city === "obn" && locale === "ru" && (
        <NextLink passHref href={`/${city}/leisures`}>
          <Link
            uppercase
            size="m"
            color="dark"
            active={asPath.endsWith("/leisures")}
          >
            {t("leisures")}
          </Link>
        </NextLink>
      )}
      <NextLink passHref href={`/${city}/news`}>
        <Link uppercase size="m" color="dark" active={asPath.endsWith("/news")}>
          {t("news")}
        </Link>
      </NextLink>
      <NextLink passHref href={`/${city}/contacts`}>
        <Link
          uppercase
          size="m"
          color="dark"
          active={asPath.endsWith("/contacts")}
        >
          {t("contacts")}
        </Link>
      </NextLink>
    </nav>
  );
};
