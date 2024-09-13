import PropTypes from "prop-types";

import { Text } from "@/ui/data-display";

import styles from "./WelcomeText.module.css";

export const WelcomeText = ({ children }) => (
  <Text variant="normalL" color="secondary" className={styles.welcomeText}>
    {children}
  </Text>
);

WelcomeText.propTypes = {
  children: PropTypes.node,
};
