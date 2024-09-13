import NextImage from "next/image";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import clsx from "clsx";

import { Multiline } from "@/lib/multiline";
import { Divider, Text, Title } from "@/ui/data-display";
import { Button } from "@/ui/inputs";
import { useCity } from "@/features/cities";

import styles from "./SpecialOfferCard.module.css";

export const SpecialOfferCard = ({ specialOffer, className }) => {
  const { t } = useTranslation("special-offers", {
    keyPrefix: "ui.specialOfferCard",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const { city } = useCity();

  return (
    <div className={clsx(styles.specialOfferCard, className)}>
      <NextImage
        width={isTablet ? 173 : 329}
        height={286}
        src={specialOffer.cover.url}
        alt={specialOffer.title}
        className={styles.specialOfferCover}
      />
      <div className={styles.specialOfferContent}>
        <div className={styles.specialOfferInfo}>
          <Title order={isTablet ? 5 : 4} className={styles.specialOfferTitle}>
            {specialOffer.title}
          </Title>
          <Text
            variant={isTablet ? "normalS" : "normalM"}
            color="secondary"
            className={styles.specialOfferDesc}
          >
            <Multiline>{specialOffer.shortDescription}</Multiline>
          </Text>
        </div>
        <div className={styles.specialOfferActions}>
          {!isTablet && (
            <Divider
              flexItem
              orientation="vertical"
              className={styles.specialOfferDivider}
            />
          )}
          <NextLink
            passHref
            href={`/${city}/special-offers/${specialOffer.id}`}
          >
            <Button
              uppercase
              size={isTablet ? "s" : "l"}
              component="a"
              className={styles.specialOfferMoreBtn}
            >
              {t("more")}
            </Button>
          </NextLink>
        </div>
      </div>
    </div>
  );
};

SpecialOfferCard.propTypes = {
  specialOffer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }),
  className: PropTypes.string,
};
