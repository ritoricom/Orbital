import NextScript from "next/script";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { initBnovo } from "@/lib/bnovo/init";
import { Modal, ModalHeader } from "@/ui/overlay";
import { useCity } from "@/features/cities";

import styles from "./BookingModal.module.css";

const BNOVO_WIDGET_MODAL_ID = "bn-widget-modal";

export const BookingModal = ({ open, root = true, onClose }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "lib.bnovo.bookingModal",
  });
  const { city } = useCity();
  const { locale } = useRouter();

  const handleReadyBnovo = () => {
    initBnovo(BNOVO_WIDGET_MODAL_ID, {
      initialCity: city,
      widgetVariant: "adapt",
      lang: locale,
      labels: {
        spb: t("spb"),
        obn: t("obn"),
        nvz: t("nvz"),
      },
    });
  };

  return (
    <Modal open={open} root={root} fullHeight onClose={onClose}>
      <ModalHeader
        title={t("bookingRoom")}
        closeIconVariant="bold"
        titleProps={{
          order: 5,
          className: styles.bookingModalTitle,
        }}
        closeButtonProps={{
          className: styles.bookingModalTitle,
        }}
        onClose={onClose}
      />
      <div
        id={BNOVO_WIDGET_MODAL_ID}
        className={styles.bookingPanelWidget}
      ></div>
      <NextScript
        src="https://widget.reservationsteps.ru/js/bnovo.js"
        onReady={handleReadyBnovo}
      />
    </Modal>
  );
};

BookingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  root: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
