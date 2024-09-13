import PropTypes from "prop-types";

import { useMediaQuery } from "@/lib/media";
import { BurgerMenu, MainContacts, SwitchLang } from "@/ui/layout";
import { CitiesLink } from "@/features/cities";
import { useRouter } from "next/router";

import styles from "./HeaderContent.module.css";
import { useState } from "react";
import { SearchButton } from "@/ui/inputs";

export const HeaderContent = ({ contacts }) => {
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const { asPath } = useRouter();

  const [openedSearch, setOpenedSearch] = useState(false);

  const handleCloseSearch = () => {
    setOpenedSearch(false);
  };
  const handleOpenSearch = () => {
    setOpenedSearch(true);
  };

  return (
    <div className={styles.headerContent}>
      {isTablet ? (
        <>
          <CitiesLink />
          <BurgerMenu сolor="primary" contacts={contacts} />
        </>
      ) : (
        <>
          {!openedSearch && (
            <MainContacts
              email={contacts.email}
              phone={contacts.phone}
              color="light"
            />
          )}
          {!asPath.startsWith("/obn/leisures") && !openedSearch && (
            <SwitchLang />
          )}
          <SearchButton onClose={handleCloseSearch} onOpen={handleOpenSearch} />
        </>
      )}
    </div>
  );
};

HeaderContent.propTypes = {
  contacts: PropTypes.shape({
    vkLink: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};
