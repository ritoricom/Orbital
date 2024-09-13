import PropTypes from "prop-types";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { Title } from "@/ui/data-display";
import { Button } from "@/ui/inputs";

import styles from "./NoData.module.css";

export const NoData = ({ className }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "components.dataDisplay.noData",
  });

  return (
    <div className={clsx(styles.noData, className)}>
      <Title order={3} color="tertiary" className={styles.noDataTitle}>
        {t("title")}
      </Title>
      <NextLink passHref href="/">
        <Button
          fullWidth
          uppercase
          size="l"
          component="a"
          className={styles.noDataReturnBtn}
        >
          {t("returnMain")}
        </Button>
      </NextLink>
    </div>
  );
};

NoData.propTypes = {
  className: PropTypes.string,
};
