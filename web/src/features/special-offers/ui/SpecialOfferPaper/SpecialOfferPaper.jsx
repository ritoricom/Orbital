import PropTypes from "prop-types";
import clsx from "clsx";

import { Multiline } from "@/lib/multiline";
import { HtmlContent } from "@/lib/html-content";
import { Divider, Paper, Text, Title } from "@/ui/data-display";
import { Button } from "@/ui/inputs";
import { PhoneIcon } from "@/ui/icons";
import { createPhoneHref } from "@/utils/anchor";
import { displayPhone } from "@/utils/display";
import { isNonNullable } from "@/utils/equals";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";

import styles from "./SpecialOfferPaper.module.css";

export const SpecialOfferPaper = ({
  title,
  description,
  note,
  primaryPhone,
  secondaryPhone,
  className,
}) => {
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <Paper className={clsx(styles.specialOfferPaper, className)}>
      <div>
        <Title
          order={isTablet ? 4 : 3}
          color="primary"
          className={styles.specialOfferPaperTitle}
        >
          {title}
        </Title>
        <HtmlContent className={styles.specialOfferPaperDesc}>
          {description}
        </HtmlContent>
      </div>
      <div>
        <Divider
          color="secondary"
          className={styles.specialOfferPaperDivider}
        />
        {isNonNullable(note) && (
          <Text
            color="secondary"
            variant={isMobile ? "normalS" : "normalM"}
            className={styles.specialOfferPaperNote}
          >
            <Multiline>{note}</Multiline>
          </Text>
        )}
        {(isNonNullable(primaryPhone) || isNonNullable(secondaryPhone)) && (
          <div className={styles.specialOfferPaperActions}>
            {isNonNullable(primaryPhone) && (
              <Button
                size="l"
                color="secondaryLight"
                component="a"
                href={createPhoneHref(primaryPhone)}
                className={styles.specialOfferPaperBtn}
              >
                <span>{displayPhone(primaryPhone)}</span>
                <Divider
                  flexItem
                  orientation="vertical"
                  className={styles.specialOfferPaperBtnDivider}
                />
                <PhoneIcon />
              </Button>
            )}
            {isNonNullable(secondaryPhone) && (
              <Button
                size="l"
                color="secondaryLight"
                component="a"
                href={createPhoneHref(secondaryPhone)}
                className={styles.specialOfferPaperBtn}
              >
                <span>{displayPhone(secondaryPhone)}</span>
                <Divider
                  flexItem
                  orientation="vertical"
                  className={styles.specialOfferPaperBtnDivider}
                />
                <PhoneIcon />
              </Button>
            )}
          </div>
        )}
      </div>
    </Paper>
  );
};

SpecialOfferPaper.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  note: PropTypes.string,
  primaryPhone: PropTypes.string,
  secondaryPhone: PropTypes.string,
  className: PropTypes.string,
};
