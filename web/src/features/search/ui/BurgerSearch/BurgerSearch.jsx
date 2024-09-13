import { useState } from "react";
import { useTranslation } from "next-i18next";

import { SearchIcon } from "@/ui/icons";
import { SearchModal } from "@/features/search";
import { Text } from "@/ui/data-display";

import styles from "./BurgerSearch.module.css";

export const BurgerSearch = ({ closeBurgerMenu }) => {
  const { t } = useTranslation("search", {
    keyPrefix: "ui.burgerSearch",
  });

  const [openBurgerSearch, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button onClick={handleOpen} className={styles.burgerSearchButton}>
        <Text
          variant={"upM"}
          color="primary"
          className={styles.burgerSearchText}
        >
          {t("search")}
        </Text>
        <span className={styles.burgerSearchIcon}>
          <SearchIcon />
        </span>
      </button>
      <SearchModal
        open={openBurgerSearch}
        onClose={handleClose}
        onCardClick={closeBurgerMenu}
      />
    </>
  );
};
