import { useTranslation } from "next-i18next";

import { Text, Title } from "@/ui/data-display";

import styles from "./HistoryHotelInfo.module.css";

export const HistoryHotelInfo = ({ children }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.historyHotel.historyHotelInfo",
  });

  return (
    <div className={styles.historyHotelInfo}>
      <Title order={2} color="primary" className={styles.historyHotelInfoTitle}>
        {t("title")}
      </Title>
      <Text
        variant="normalL"
        color="secondary"
        className={styles.historyHotelInfoDescription}
      >
        {children}
      </Text>
    </div>
  );
};
