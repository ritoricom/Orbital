import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { Link } from "@/ui/navigation";
import { useCity } from "@/features/cities";

import styles from "./BurgerMenuNavbar.module.css";

export const BurgerMenuNavbar = () => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.burgerMenuNavbar",
  });

  const { asPath, locale } = useRouter();
  const { city } = useCity();
  return (
    <nav className={styles.BurgerMenuNavbar}>
      <NextLink passHref href={`/${city}/rooms`}>
        <Link
          uppercase
          size="l"
          color="dark"
          active={asPath.endsWith("/rooms")}
        >
          {t("rooms")}
        </Link>
      </NextLink>
      <NextLink passHref href={`/${city}/about`}>
        <Link
          uppercase
          size="l"
          color="dark"
          active={asPath.endsWith("/about")}
        >
          {t("about")}
        </Link>
      </NextLink>
      <NextLink passHref href={`/${city}/special-offers`}>
        <Link
          uppercase
          size="l"
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
            size="l"
            color="dark"
            active={asPath.endsWith("/leisures")}
          >
            {t("leisures")}
          </Link>
        </NextLink>
      )}

      <NextLink passHref href={`/${city}/news`}>
        <Link uppercase size="l" color="dark" active={asPath.endsWith("/news")}>
          {t("news")}
        </Link>
      </NextLink>
      <NextLink passHref href={`/${city}/contacts`}>
        <Link
          uppercase
          size="l"
          color="dark"
          active={asPath.endsWith("/contacts")}
        >
          {t("contacts")}
        </Link>
      </NextLink>
    </nav>
  );
};
