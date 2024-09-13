import { useState } from "react";
import NextScript from "next/script";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";

import { useMediaQuery } from "@/lib/media";
import { Title } from "@/ui/data-display";
import { Container } from "@/ui/layout";
import { Button } from "@/ui/inputs";
import { useCity } from "@/features/cities";
import { BookingModal } from "../BookingModal";
import { initBnovo } from "../init";

import styles from "./BookingPanel.module.css";

export const BNOVO_ROOT_ID = "booking-panel";
export const BNOVO_WIDGET_ID = "bn-widget";

export const BookingPanel = ({
  withContainer = true,
  root = true,
  isSticky = false,
  className,
}) => {
  const { locale } = useRouter();
  const { t } = useTranslation("common", {
    keyPrefix: "lib.bnovo.bookingPanel",
  });

  const [openBookModal, setOpenBook] = useState(false);

  const openBook = () => setOpenBook(true);

  const isLaptop = useMediaQuery("(max-width: 1024px)");

  const handleCloseBook = () => {
    setOpenBook(false);
  };

  const { city } = useCity();

  const handleReadyBnovo = () => {
    initBnovo(BNOVO_WIDGET_ID, {
      initialCity: city,
      widgetVariant: "desktop",
      lang: locale,
      labels: {
        spb: t("spb"),
        obn: t("obn"),
        nvz: t("nvz"),
      },
    });
  };

  return (
    <>
      <Container className={clsx(!withContainer && styles.containerNonSpacing)}>
        {!isLaptop ? (
          <div id={BNOVO_ROOT_ID} className={styles.bookingPanel}>
            <Title
              order={5}
              className={clsx(
                styles.bookingPanelElem,
                styles.bookingPanelTitle
              )}
            >
              {t("bookingRoom")}
            </Title>
            <div
              id={BNOVO_WIDGET_ID}
              className={styles.bookingPanelWidget}
            ></div>
            <NextScript
              src="https://widget.reservationsteps.ru/js/bnovo.js"
              onReady={handleReadyBnovo}
            />
          </div>
        ) : (
          <Button
            size="l"
            className={clsx(!isSticky && styles.buttonBook, className)}
            onClick={openBook}
          >
            {t("bookRoom")}
          </Button>
        )}
      </Container>
      <BookingModal
        open={openBookModal}
        root={root}
        onClose={handleCloseBook}
      />
    </>
  );
};

BookingPanel.propTypes = {
  withContainer: PropTypes.bool,
  root: PropTypes.bool,
  className: PropTypes.string,
};
