import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";

import { isEmptyArray } from "@/utils/equals";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { Divider, Title } from "@/ui/data-display";
import { LeisureCard, LeisureCardGrid } from "@/features/leisures";

import styles from "./OtherLeisures.module.css";

export const OtherLeisures = ({ leisures, className }) => {
  const { t } = useTranslation("leisures", {
    keyPrefix: "ui.otherLeisures",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  if (isEmptyArray(leisures)) {
    return null;
  }

  return (
    <div className={clsx(styles.otherLeisures, className)}>
      {!isTablet && <Divider className={styles.otherLeisuresDivider} />}
      <Title
        order={isTablet ? (isMobile ? 2 : 3) : 2}
        color="primary"
        className={styles.otherLeisuresTitle}
      >
        {t("title")}
      </Title>
      <LeisureCardGrid className={styles.leisureCardGrid}>
        {leisures.map((leisure) => (
          <LeisureCard
            key={leisure.id}
            leisure={leisure}
            titleClassName={styles.otherLeisuresCardTitle}
          />
        ))}
      </LeisureCardGrid>
    </div>
  );
};

OtherLeisures.propTypes = {
  leisures: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  className: PropTypes.string,
};
