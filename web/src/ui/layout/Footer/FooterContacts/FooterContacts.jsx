import PropTypes from "prop-types";
import { MainContacts, SocialNetworks } from "@/ui/layout";

import styles from "./FooterContacts.module.css";

export const FooterContacts = ({ contacts }) => (
  <div className={styles.footerContacts}>
    <MainContacts phone={contacts.phone} email={contacts.email} color="dark" />
    <SocialNetworks vk={contacts.vkLink} />
  </div>
);

FooterContacts.propTypes = {
  contacts: PropTypes.shape({
    vkLink: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
};
