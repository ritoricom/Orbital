import { useTranslation } from "next-i18next";
import { Title, Text } from "@/ui/data-display";

import { YandexMap } from "@/lib/react-map-display";
import { Divider } from "@/ui/data-display";
import { Container } from "@/ui/layout";
import styles from "./Location.module.css";
import PropTypes from "prop-types";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

export const Location = ({ contacts }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.location",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <Container className={styles.locationContainer}>
      {!isTablet && <Divider />}
      <Title
        color="primary"
        order={isTablet ? 4 : 2}
        className={styles.locationTitle}
      >
        {t("title")}
      </Title>

      <div className={styles.locationMapAndAddressWrapper}>
        <div className={styles.map}>
          <YandexMap
            className={styles.locationMap}
            center={contacts.coordinates}
            coordinates={[contacts.coordinates]}
            width="100%"
            height={isTablet ? "360px" : "506px"}
            zoom={17}
          />
        </div>

        <div className={styles.locationAddress}>
          <Text
            className={styles.locationAddressText}
            color="primary"
            variant="normalS"
          >
            {contacts.address}
          </Text>
        </div>
      </div>
    </Container>
  );
};

Location.propTypes = {
  contacts: PropTypes.shape({
    address: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
      .isRequired,
  }),
};
