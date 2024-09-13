import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";

import { MailIcon, PhoneIcon, RouteIcon } from "@/ui/icons";
import { isNonNullable } from "@/utils/equals";
import { createEmailHref, createPhoneHref } from "@/utils/anchor";
import { displayPhone } from "@/utils/display";
import { Button } from "@/ui/inputs";
import { Divider, Paper, Text, Title } from "@/ui/data-display";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { LeisureDayDisplay } from "@/features/leisures";
import { HtmlContent } from "@/lib/html-content";

import styles from "./LeisurePaper.module.css";

export const LeisurePaper = ({
  title,
  route,
  description,
  note,
  phoneNumber,
  email,
  days,
  className,
}) => {
  const { t } = useTranslation("leisures", {
    keyPrefix: "ui.leisuresPaper",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  const renderDays = days.map((day, index) => (
    <LeisureDayDisplay day={day} key={index} />
  ));

  return (
    <Paper className={clsx(styles.leisuresPaper, className)}>
      <Title order={isTablet ? 4 : 3} className={styles.leisuresPaperTitle}>
        {title}
      </Title>
      {isNonNullable(route) && (
        <div className={styles.leisuresPaperRouteBox}>
          {!isTablet && (
            <>
              <RouteIcon />
              <Divider
                orientation="vertical"
                className={styles.leisuresPaperDividerVertical}
              />
            </>
          )}
          <span>
            <Text
              variant={isTablet ? (isMobile ? "upS" : "upM") : "upS"}
              color="tertiary"
              className={styles.leisuresPaperRouteTitle}
            >
              {t("route")}
            </Text>
            <Text
              variant={
                isTablet ? (isMobile ? "normalS" : "normalM") : "normalL"
              }
              className={styles.leisuresPaperRoute}
            >
              {route}
            </Text>
          </span>
        </div>
      )}
      {renderDays}
      {isTablet && (
        <Divider
          orientation="horizontal"
          className={styles.leisuresPaperDividerHorizontal}
        />
      )}
      <HtmlContent className={styles.leisuresPaperDescription}>
        {description}
      </HtmlContent>
      <Divider
        orientation="horizontal"
        className={styles.leisuresPaperDividerHorizontal}
      />
      {isNonNullable(note) && (
        <Text
          variant={isMobile ? "normalS" : "normalM"}
          color="secondary"
          className={styles.leisuresPaperNote}
        >
          {note}
        </Text>
      )}
      {(isNonNullable(phoneNumber) || isNonNullable(email)) && (
        <div className={styles.leisuresPaperActions}>
          {isNonNullable(phoneNumber) && (
            <Button
              size="l"
              color="secondaryLight"
              component="a"
              href={createPhoneHref(phoneNumber)}
              className={styles.leisuresPaperBtnPhone}
            >
              <span>{displayPhone(phoneNumber)}</span>
              <Divider
                flexItem
                orientation="vertical"
                className={styles.leisuresPaperBtnDivider}
              />
              <PhoneIcon />
            </Button>
          )}
          {isNonNullable(email) && (
            <Button
              size="l"
              color="secondaryLight"
              component="a"
              uppercase
              href={createEmailHref(email)}
              className={styles.leisuresPaperBtnMail}
            >
              {email}
              <Divider
                flexItem
                orientation="vertical"
                className={styles.leisuresPaperBtnDivider}
              />
              <MailIcon />
            </Button>
          )}
        </div>
      )}
    </Paper>
  );
};

LeisurePaper.propTypes = {
  title: PropTypes.string,
  route: PropTypes.string,
  description: PropTypes.string,
  note: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  days: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  className: PropTypes.string,
};
