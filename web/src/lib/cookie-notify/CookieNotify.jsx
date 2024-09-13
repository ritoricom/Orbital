import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "next-i18next";

import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";
import { useLocalStorage } from "@/hooks";
import { Title, Text } from "@/ui/data-display";
import { Button } from "@/ui/inputs";
import { Container } from "@/ui/layout";

import styles from "./CookieNotify.module.css";

export const CookieNotify = ({ className }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "lib.cookieNotify",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  const [isAgreeToCookie, setAgreeToCookie] = useLocalStorage({
    key: "isAgreeToCookie",
    defaultValue: null,
    onInitialValueInEffect: (value) => {
      if (value === null) {
        setAgreeToCookie(false);
      }
    },
  });

  const handleAgree = () => {
    setAgreeToCookie(true);
  };

  if (isAgreeToCookie === null || isAgreeToCookie) {
    return null;
  }

  return (
    <div className={clsx(styles.cookieNotify, className)}>
      <Container>
        <div className={styles.cookieNotifyInner}>
          {isTablet ? (
            <Text variant="normalM" className={styles.cookieNotifyTitle}>
              {t("title")}
            </Text>
          ) : (
            <Title order={4} className={styles.cookieNotifyTitle}>
              {t("title")}
            </Title>
          )}
          <Button
            uppercase
            fullWidth={!isTablet || isMobile}
            size={isTablet ? "s" : "l"}
            className={styles.cookieNotifyAgreeBtn}
            onClick={handleAgree}
          >
            {t("agree")}
          </Button>
        </div>
      </Container>
    </div>
  );
};

CookieNotify.propTypes = {
  className: PropTypes.string,
};
