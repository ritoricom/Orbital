import { Text } from "@/ui/data-display";
import styles from "./SpoilerButton.module.css";
import { CheckMarkIcon } from "@/ui/icons";

export const SpoilerButton = ({ children, onClick }) => (
  <div className={styles.spoilerButton} onClick={onClick}>
    <Text className={styles.spoilerButtonText} color="secondary" variant="upM">
      {children}
    </Text>
    <CheckMarkIcon className={styles.spoilerButtonIcon} />
  </div>
);
