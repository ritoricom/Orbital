import { Text } from "@/ui/data-display";
import styles from "./ContactsDisplay.module.css";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { createPhoneHref, createEmailHref } from "@/utils/anchor";
import { displayPhone } from "@/utils/display";
import { Link } from "@/ui/navigation";

export const ContactsDisplay = ({ contacts, className }) => {
  const { t } = useTranslation("contacts", {
    keyPrefix: "ui.contactsDisplay",
  });

  return (
    <div className={clsx(styles.contactsDisplay, className)}>
      <div className={styles.contactsDisplayInner}>
        <Text
          color="tertiary"
          className={styles.contactsNameDisplay}
          variant="normalS"
        >
          {t("address")}
        </Text>
        <Text variant="normalL" className={styles.contactsContentInTable}>
          {contacts.address}
        </Text>
        <hr className={styles.contactsHrDisplay} />
      </div>
      <div className={styles.contactsDisplayInner}>
        <Text
          variant="normalS"
          color="tertiary"
          className={styles.contactsNameDisplay}
        >
          {t("e-mail")}
        </Text>
        <Link
          size="l"
          color="dark"
          lineClamp={1}
          href={createEmailHref(contacts.email)}
          className={styles.contactsDisplayContacts}
        >
          {contacts.email}
        </Link>
        <hr className={styles.contactsHrDisplay} />
      </div>
      <div className={styles.contactsDisplayInner}>
        <Text
          color="tertiary"
          variant="normalS"
          className={styles.contactsNameDisplay}
        >
          {t("phone")}
        </Text>
        <Link
          size="l"
          color="dark"
          href={createPhoneHref(contacts.phone)}
          className={styles.contactsDisplayContacts}
        >
          {displayPhone(contacts.phone)}
        </Link>
      </div>
    </div>
  );
};
