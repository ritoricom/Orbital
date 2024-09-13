import PropTypes from "prop-types";

import { useMediaQuery } from "@/lib/media";
import { HtmlContent } from "@/lib/html-content";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { Divider, Text, Title } from "@/ui/data-display";
import { AccountIcon, ClockIcon, LocationIcon } from "@/ui/icons";
import { isNonNullable } from "@/utils/equals";

import styles from "./LeisureDayDisplay.module.css";

export const LeisureDayDisplay = ({ day }) => {
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <>
      {isTablet && <Divider />}
      <div className={styles.leisureDayDisplay}>
        {!isTablet && (
          <Divider
            orientation="vertical"
            className={styles.leisureDayDisplayDividerVertical}
          />
        )}
        <div>
          {isMobile ? (
            <Text variant={"boldM"} className={styles.leisureDayDisplayTitle}>
              {day.title}
            </Text>
          ) : (
            <Title order={5} className={styles.leisureDayDisplayTitle}>
              {day.title}
            </Title>
          )}

          {isNonNullable(day.timeAndPlace) && (
            <Text
              variant={isMobile ? "boldS" : "boldM"}
              color="secondary"
              className={styles.leisureDayDisplayOptions}
            >
              <LocationIcon />
              {day.timeAndPlace}
            </Text>
          )}
          {isNonNullable(day.duration) && (
            <Text
              variant={isMobile ? "boldS" : "boldM"}
              color="secondary"
              className={styles.leisureDayDisplayOptions}
            >
              <ClockIcon />
              {day.duration}
            </Text>
          )}
          {isNonNullable(day.host) && (
            <Text
              variant={isMobile ? "boldS" : "boldM"}
              color="secondary"
              className={styles.leisureDayDisplayOptions}
            >
              <AccountIcon />
              {day.host}
            </Text>
          )}
          <HtmlContent className={styles.leisureDayDisplayDescription}>
            {day.description}
          </HtmlContent>
        </div>
      </div>
    </>
  );
};

LeisureDayDisplay.propTypes = {
  day: PropTypes.shape({
    title: PropTypes.string,
    timeAndPlace: PropTypes.string,
    duration: PropTypes.string,
    host: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
