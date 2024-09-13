import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import NextImage from "next/image";
import PropTypes from "prop-types";
import clsx from "clsx";

import { scrollToBookingPanel } from "@/lib/bnovo";
import { Title, Spoiler } from "@/ui/data-display";
import { Button } from "@/ui/inputs";
import { useCity } from "@/features/cities";

import styles from "./WelcomeCard.module.css";

export const WelcomeCard = ({ img, className, children }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.welcome.welcomeCard",
  });

  const { city } = useCity();

  const handleClickBooking = () => {
    scrollToBookingPanel();
  };

  return (
    <div className={clsx(styles.welcomeCard, className)}>
      <div className={styles.welcomeCardTextBlock}>
        <Title order={2} color="primary" className={styles.welcomeCardTitle}>
          {t("welcome")}
        </Title>

        <Spoiler maxLineClamp={5}>{children}</Spoiler>

        <div className={styles.welcomeCardActions}>
          <Button
            uppercase
            size="l"
            color="primary"
            onClick={handleClickBooking}
          >
            {t("book")}
          </Button>

          <NextLink passHref href={`/${city}/about`}>
            <Button uppercase size="l" color="secondaryLight">
              {t("more")}
            </Button>
          </NextLink>
        </div>
      </div>
      <div className={styles.welcomeCardImg}>
        <NextImage
          layout="fill"
          alt="sight"
          src={img}
          className={styles.welcomeImg}
        />
      </div>
    </div>
  );
};

WelcomeCard.propTypes = {
  img: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
