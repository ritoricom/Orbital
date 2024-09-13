import { useTranslation } from "next-i18next";

import { Text } from "@/ui/data-display";

import styles from "./HistoryHotelCard.module.css";

export const HistoryHotelCard = ({ year, children }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.historyHotel.historyHotelCard",
  });

  return (
    <div className={styles.historyHotelCard}>
      <p className={styles.historyHotelCardYear}>{`${year} ${t("year")}`}</p>
      <Text variant="normalM" className={styles.historyHotelCardDescription}>
        {children}
      </Text>
    </div>
  );
};
