import PropTypes from "prop-types";

import { PhoneIcon, MailIcon, CertificateIcon } from "@/ui/icons";
import { Link } from "@/ui/navigation";
import { createEmailHref, createPhoneHref } from "@/utils/anchor";
import { displayPhone } from "@/utils/display";
import { useCity } from "@/features/cities/hooks/use-city";

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

export const MainContacts = ({ phone, email, color }) => {
  const { isObn, isSpb, isNvz } = useCity();

  let extraLink = null;
  if (isObn) {
    extraLink = {
      href: "https://tourism.fsa.gov.ru/ru/resorts/hotels/1910965d-c608-11ef-92da-8b82507a9634/about-resort",
      text: "С402024001994",
    };
  } else if (isSpb) {
    extraLink = {
      href: "https://tourism.fsa.gov.ru/ru/resorts/hotels/bb4a9592-c608-11ef-92da-51bc11c5688d/about-resort",
      text: "С782024016754",
    };
  } else if (isNvz) {
    extraLink = {
      href: "https://tourism.fsa.gov.ru/ru/resorts/hotels/4dc66ed3-c609-11ef-92da-7dcd0223a71a/about-resort",
      text: "С362024006746",
    };
  }

  return (
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
      {extraLink && (
        <Link
          uppercase
          size="s"
          href={extraLink.href}
          startIcon={<CertificateIcon />}
          className={styles.contactLink}
          innerClassName={getUnderlineColorClassName(color)}
        >
          {extraLink.text}
        </Link>
      )}
    </div>
  );
};

MainContacts.propTypes = {
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.values(contactsUnderlineColor)).isRequired,
};
