import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { Text } from "@/ui/data-display";
import { ModalHeader, Modal } from "@/ui/overlay";

import styles from "./SuccessModal.module.css";

export const SuccessModal = ({ open, root = true, onClose }) => {
  const { t } = useTranslation("misc", {
    keyPrefix: "ui.successModal",
  });

  return (
    <Modal open={open} root={root} onClose={onClose}>
      <ModalHeader title={t("title")} onClose={onClose} />
      <Text color="secondary" variant="normalL" className={styles.successModal}>
        {t("description")}
      </Text>
    </Modal>
  );
};

SuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  root: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
