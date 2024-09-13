import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { Divider, Paper, Text, Title } from "@/ui/data-display";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";

import styles from "./RoomPrice.module.css";

export const RoomPrice = ({ price }) => {
  const { t } = useTranslation("rooms", {
    keyPrefix: "ui.roomPrice",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <Paper className={styles.roomPrice}>
      <Divider color="secondary" className={styles.roomPriceDivider} />
      <div className={styles.roomPriceFooter}>
        <Text
          color="tertiary"
          variant={isMobile ? "upS" : "upM"}
          className={styles.roomPriceText}
        >
          {t("priceText")}
        </Text>
        <Title
          order={isTablet ? (isMobile ? 3 : 4) : 3}
          color="secondary"
          className={styles.roomPriceNumber}
        >
          {t("priceNumber", {
            price: price,
          })}
        </Title>
      </div>
    </Paper>
  );
};

RoomPrice.propTypes = {
  price: PropTypes.number.isRequired,
};
