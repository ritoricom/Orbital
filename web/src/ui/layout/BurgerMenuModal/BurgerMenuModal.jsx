import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { Link } from "@/ui/navigation";
import { Logo, SocialNetworks, SwitchLang } from "@/ui/layout";
import { Modal } from "@/ui/overlay";
import { CloseIcon } from "@/ui/icons";
import clsx from "clsx";
import { BurgerMenuNavbar, CitiesLink } from "@/features/cities";
import { BookingPanel } from "@/lib/bnovo";

import styles from "./BurgerMenuModal.module.css";
import { BurgerSearch } from "@/features/search";

export const BurgerMenuModal = ({ open, contacts, onClose }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "components.layout.burgerMenuModal",
  });

  const { asPath } = useRouter();

  return (
    <Modal fullHeight root onClose={onClose} open={open}>
      <div className={styles.burgerMenuModalHeader}>
        <Logo color="primary" className={styles.burgerMenuModalLogo} />
        <div className={styles.burgerMenuModalHeaderRight}>
          <CitiesLink color="dark" root={false} />
          <button onClick={onClose} className={styles.burgerMenuModalCloseBtn}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className={styles.burgerMenuModalBody}>
        <div>
          <BurgerMenuNavbar />
          <BurgerSearch closeBurgerMenu={onClose} />
        </div>
        <div
          className={clsx(
            styles.burgerMenuModalBodySocial,
            asPath.startsWith("/obn/leisures") &&
              styles.burgerMenuModalBodyPoliticWithoutLang
          )}
        >
          {!asPath.startsWith("/obn/leisures") && <SwitchLang color="dark" />}

          <div className={styles.burgerMenuModalBodyPolitic}>
            <SocialNetworks
              color="dark"
              vk={contacts && contacts.vkLink}
              className={styles.burgerMenuModalSocialNetworks}
            />

            <NextLink passHref href="/privacy-policy">
              <Link size="s" color="dark">
                {t("privacyPolicy")}
              </Link>
            </NextLink>
          </div>
        </div>
      </div>
      <BookingPanel
        withContainer={false}
        root={false}
        className={styles.burgerMenuBookingPanel}
      />
    </Modal>
  );
};

BurgerMenuModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contacts: PropTypes.object,
};
