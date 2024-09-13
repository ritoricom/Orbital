import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Container } from "@/ui/layout";
import { Link } from "@/ui/navigation";
import { useCity } from "@/features/cities";
import { useMediaQuery } from "@/lib/media";

import styles from "./CityNavbar.module.css";

export const CityNavbar = ({ className }) => {
  const { asPath, locale } = useRouter();

  const { t } = useTranslation("cities", {
    keyPrefix: "ui.cityNavbar",
  });

  const { city } = useCity();
  const matches = useMediaQuery("(max-width: 1024px)");

  if (matches) {
    return null;
  }

  return (
    <nav className={clsx(styles.navbar, className)}>
      <Container>
        <div className={styles.cityNavbarInner}>
          <NextLink passHref href={`/${city}/rooms`}>
            <Link uppercase size="m" active={asPath.endsWith("/rooms")}>
              {t("rooms")}
            </Link>
          </NextLink>
          <NextLink passHref href={`/${city}/about`}>
            <Link uppercase size="m" active={asPath.endsWith("/about")}>
              {t("about")}
            </Link>
          </NextLink>
          <NextLink passHref href={`/${city}/special-offers`}>
            <Link
              uppercase
              size="m"
              active={asPath.endsWith("/special-offers")}
            >
              {t("specialOffers")}
            </Link>
          </NextLink>
          {city === "obn" && locale === "ru" && (
            <NextLink passHref href={`/${city}/leisures`}>
              <Link uppercase size="m" active={asPath.endsWith("/leisures")}>
                {t("leisures")}
              </Link>
            </NextLink>
          )}
          <NextLink passHref href={`/${city}/news`}>
            <Link uppercase size="m" active={asPath.endsWith("/news")}>
              {t("news")}
            </Link>
          </NextLink>
          <NextLink passHref href={`/${city}/contacts`}>
            <Link uppercase size="m" active={asPath.endsWith("/contacts")}>
              {t("contacts")}
            </Link>
          </NextLink>
        </div>
      </Container>
    </nav>
  );
};
