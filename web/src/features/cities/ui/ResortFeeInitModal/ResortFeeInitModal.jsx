import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { useLocalStorage } from "@/hooks";
import { ModalHeader, Modal } from "@/ui/overlay";
import { Text } from "@/ui/data-display";

export const ResortFeeInitModal = ({ root = true }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.resortFeeInitModal",
  });

  const [isModalShowed, setModalShowed] = useLocalStorage({
    key: "isModalShowed",
    defaultValue: null,
    onInitialValueInEffect: (value) => {
      if (value === null) {
        setModalShowed(false);
      }
    },
  });

  const handleClose = () => {
    setModalShowed(true);
  };

  if (isModalShowed === null || isModalShowed) {
    return null;
  }

  return (
    <Modal open={!isModalShowed} root={root} onClose={handleClose}>
      <ModalHeader title={t("title")} onClose={handleClose} />
      <Text color="secondary" variant={"normalM"}>
        {t("text1")}
      </Text>
      <Text color="secondary" variant={"normalM"}>
        {t("text2")}
      </Text>
      <Text color="secondary" variant={"normalM"}>
        {t("text3")}
      </Text>
      <Text color="secondary" variant={"normalM"}>
        {t("text4")}
      </Text>
    </Modal>
  );
};

ResortFeeInitModal.propTypes = {
  open: PropTypes.bool.isRequired,
  root: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
