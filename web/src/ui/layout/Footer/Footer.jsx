import PropTypes from "prop-types";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";

import { APP_HOST } from "@/config/app";
import { Divider, Text } from "@/ui/data-display";
import { AddCodeIcon } from "@/ui/icons";
import { Container, Logo, CityLinks } from "@/ui/layout";
import { CitiesLink, useCity } from "@/features/cities";
import { Link } from "@/ui/navigation";
import { getCurrentYear } from "@/utils/date";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import styles from "./Footer.module.css";

export const Footer = ({ children, chooseCity = true }) => {
  const { t } = useTranslation("common");

  const { city } = useCity();
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerHead}>
          <div className={styles.footerHeadLeft}>
            <Logo color="secondary" className={styles.footerLogo} />
            {!isTablet ? <CityLinks /> : chooseCity && <CitiesLink />}
          </div>
          {!isTablet && children}
        </div>
        <Divider className={styles.footerDivider} />
        <div className={styles.footerChildren}>{isTablet && children}</div>
        <div className={styles.footerFoot}>
          <Text
            variant="normalXs"
            color="white"
            className={styles.footerRights}
          >
            {t("components.layout.footer.rights", {
              currentYear: getCurrentYear(),
              selfLink: APP_HOST,
            })}
          </Text>
          <div className={styles.footerFootRight}>
            <NextLink passHref href="/privacy-policy">
              <Link size="s" className={styles.footerLink}>
                {t("components.layout.footer.privacyPolicy")}
              </Link>
            </NextLink>
            <NextLink passHref href={`/${city}/hotel-rules`}>
              <Link size="s" className={styles.footerLink}>
                {t("components.layout.footer.rules")}
              </Link>
            </NextLink>
            <a href="https://addcode.ru" target="_blank" rel="noreferrer">
              <AddCodeIcon />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  children: PropTypes.node,
};
