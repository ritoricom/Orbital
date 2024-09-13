import PropTypes from "prop-types";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";

import { isEmptyArray } from "@/utils/equals";
import { Container } from "@/ui/layout";
import { Divider, Title, Text } from "@/ui/data-display";
import { Button } from "@/ui/inputs";
import { SpecialForYouCard } from "./SpecialForYouCard";
import { useCity } from "@/features/cities";

import styles from "./SpecialForYou.module.css";

export const SpecialForYou = ({ description, specialOffers }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.specialForYou",
  });

  const { city } = useCity();

  if (isEmptyArray(specialOffers)) {
    return null;
  }

  const renderCards = specialOffers.map((specialOffer) => (
    <SpecialForYouCard specialOffer={specialOffer} key={specialOffer.id} />
  ));

  return (
    <div>
      <Container>
        <div className={styles.specialForYouDiv}>
          <div className={styles.specialForYouInfo}>
            <Divider orientation="horizontal" />
            <Title
              order={2}
              color="primary"
              className={styles.specialForYouTitle}
            >
              {t("title")}
            </Title>
            <Text
              variant="normalL"
              color="secondary"
              className={styles.specialForYouDescription}
            >
              {description}
            </Text>
          </div>
          {renderCards}
          <NextLink passHref href={`${city}/special-offers`}>
            <Button
              fullWidth
              uppercase
              color="secondaryDark"
              className={styles.specialForYouButton}
            >
              {t("button")}
            </Button>
          </NextLink>
        </div>
      </Container>
    </div>
  );
};

SpecialForYou.propTypes = {
  description: PropTypes.string.isRequired,
  specialOffers: PropTypes.array.isRequired,
};
