import PropTypes from "prop-types";

import { PhoneIcon, MailIcon } from "@/ui/icons";
import { Link } from "@/ui/navigation";
import { createEmailHref, createPhoneHref } from "@/utils/anchor";
import { displayPhone } from "@/utils/display";

import styles from "./MainContacts.module.css";

const contactsUnderlineColor = {
  dark: "dark",
  light: "light",
};

const getUnderlineColorClassName = (underlineColor) => {
  switch (underlineColor) {
    case contactsUnderlineColor.dark:
      return styles.contactLinkDark;
    case contactsUnderlineColor.light:
      return styles.contactLinkLight;
  }
};

export const MainContacts = ({ phone, email, color }) => (
  <div className={styles.contactBox}>
    <Link
      uppercase
      size="s"
      href={createPhoneHref(phone)}
      startIcon={<PhoneIcon />}
      className={styles.contactLink}
      innerClassName={getUnderlineColorClassName(color)}
    >
      {displayPhone(phone)}
    </Link>
    <Link
      uppercase
      size="s"
      lineClamp={1}
      href={createEmailHref(email)}
      startIcon={<MailIcon />}
      className={styles.contactLink}
      innerClassName={getUnderlineColorClassName(color)}
    >
      {email}
    </Link>
  </div>
);

MainContacts.propTypes = {
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.values(contactsUnderlineColor)).isRequired,
};
