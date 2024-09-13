import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { Divider, Paper, Text } from "@/ui/data-display";
import { isEmptyArray } from "@/utils/equals";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";

import styles from "./RoomPeculiarities.module.css";

export const RoomPeculiarities = ({ peculiarities }) => {
  const { t } = useTranslation("rooms", {
    keyPrefix: "ui.roomPeculiarities",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  if (isEmptyArray(peculiarities)) {
    return null;
  }

  return (
    <Paper className={styles.roomPeculiarities}>
      <Text
        color="tertiary"
        variant={isMobile ? "upS" : "upM"}
        className={styles.roomPeculiaritiesTitle}
      >
        {t("title")}
      </Text>
      {!isTablet && <Divider />}
      <ul className={styles.roomPeculiaritiesList}>
        {peculiarities.map((peculiarity, index) => (
          <li key={index}>
            <Text
              color="secondary"
              variant={isMobile ? "normalS" : "normalM"}
              className={styles.roomPeculiaritiesListItem}
            >
              {peculiarity}
            </Text>
          </li>
        ))}
      </ul>
    </Paper>
  );
};

RoomPeculiarities.propTypes = {
  peculiarities: PropTypes.array.isRequired,
  className: PropTypes.string,
};
