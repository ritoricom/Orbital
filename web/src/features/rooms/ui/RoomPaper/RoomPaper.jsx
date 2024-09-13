import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Multiline } from "@/lib/multiline";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { Paper, Text, Divider, Title } from "@/ui/data-display";

import styles from "./RoomPaper.module.css";

export const RoomPaper = ({ description, title, price, className }) => {
  const { t } = useTranslation("rooms", {
    keyPrefix: "ui.roomPaper",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <Paper className={clsx(styles.roomPaper, className)}>
      <div>
        {isTablet && (
          <Title order={4} className={styles.roomPaperTitle}>
            {title}
          </Title>
        )}
        <Text
          color="tertiary"
          variant={isMobile ? "upS" : "upM"}
          className={styles.roomPaperDescTitle}
        >
          {t("description")}
        </Text>
        <Text
          color="secondary"
          variant={isMobile ? "normalS" : "normalM"}
          className={styles.roomPaperDesc}
        >
          {description ? (
            <Multiline>{description}</Multiline>
          ) : (
            t("noDescription")
          )}
        </Text>
      </div>
      {!isTablet && (
        <div className={styles.roomPaperFooter}>
          <Divider color="secondary" className={styles.roomPaperDivider} />
          <Text
            color="tertiary"
            variant="upM"
            className={styles.roomPaperPriceText}
          >
            {t("priceText")}
          </Text>
          <Title
            order={isTablet ? 4 : 3}
            color="secondary"
            className={styles.roomPaperPrice}
          >
            {t("priceNumber", {
              price: price,
            })}
          </Title>
        </div>
      )}
    </Paper>
  );
};

RoomPaper.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  className: PropTypes.string,
};
