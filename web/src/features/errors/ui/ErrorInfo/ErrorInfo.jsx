import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import { Button } from "@/ui/inputs";

import styles from "./ErrorInfo.module.css";

export const ErrorInfo = ({
  hasReturnAction = false,
  statusCode,
  message,
  className,
}) => {
  const { t } = useTranslation("errors", {
    keyPrefix: "components.errorInfo",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <div
      className={clsx(
        styles.errorInfo,
        hasReturnAction && styles.errorInfoHasReturnAction,
        className
      )}
    >
      <div className={styles.errorInfoInner}>
        <h2 className={styles.errorInfoStatusCode}>{statusCode}</h2>
        <h3 className={styles.errorInfoMessage}>{message}</h3>
        {hasReturnAction && (
          <NextLink passHref href="/">
            <Button
              uppercase
              size={isTablet ? "m" : "l"}
              component="a"
              className={styles.errorInfoButtonReturn}
            >
              {t("returnMain")}
            </Button>
          </NextLink>
        )}
      </div>
    </div>
  );
};

ErrorInfo.propTypes = {
  hasReturnAction: PropTypes.bool,
  statusCode: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};
