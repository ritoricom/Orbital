import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Link } from "@/ui/navigation";
import { ModalHeader, Modal } from "@/ui/overlay";

import styles from "./CitiesModal.module.css";

export const CitiesModal = ({ open, root = true, onClose }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.citiesModal",
  });

  const { asPath } = useRouter();

  return (
    <Modal open={open} root={root} onClose={onClose}>
      <ModalHeader title={t("title")} onClose={onClose} />
      <div className={styles.citiesModal}>
        <NextLink passHref href="/spb">
          <Link
            uppercase
            size="s"
            color="dark"
            active={asPath.startsWith("/spb")}
          >
            {t("spb")}
          </Link>
        </NextLink>
        <NextLink passHref href="/obn">
          <Link
            uppercase
            size="s"
            color="dark"
            active={asPath.startsWith("/obn")}
          >
            {t("obn")}
          </Link>
        </NextLink>
        <NextLink passHref href="/nvz">
          <Link
            uppercase
            size="s"
            color="dark"
            active={asPath.startsWith("/nvz")}
          >
            {t("nvz")}
          </Link>
        </NextLink>
      </div>
    </Modal>
  );
};

CitiesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  root: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
