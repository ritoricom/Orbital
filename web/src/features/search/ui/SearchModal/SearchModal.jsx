import PropTypes from "prop-types";
import { useDeferredValue, useState } from "react";

import { Modal } from "@/ui/overlay";
import { CloseIcon, SearchIcon } from "@/ui/icons";
import { Input } from "@/ui/inputs";

import { SearchModalContent, useSearch } from "@/features/search";
import { useRouter } from "next/router";

import styles from "./SearchModal.module.css";

export const SearchModal = ({ open, onClose, onCardClick }) => {
  const [search, setSearch] = useState("");

  const searchDeferred = useDeferredValue(search);

  const { locale } = useRouter();

  const { data } = useSearch({
    search: searchDeferred,
    lang: locale,
    queryConfig: { enabled: searchDeferred !== "" },
  });

  return (
    <Modal
      open={open}
      root={false}
      fullHeight
      onClose={onClose}
      className={styles.searchModal}
    >
      <div className={styles.searchModalInputFixed}>
        <Input
          startIcon={<SearchIcon />}
          endIcon={<CloseIcon />}
          onClickEndIcon={() => {
            onClose(), setSearch("");
          }}
          className={styles.searchModalInput}
          autoFocus={true}
          onChange={(event) => setSearch(event.target.value)}
          inputBoxClassName={styles.searchModalInputBox}
        />
      </div>
      <SearchModalContent
        specs={data?.specialOffers}
        news={data?.news}
        rooms={data?.rooms}
        leisures={data?.leisures}
        className={styles.searchPopperModal}
        onClickCard={onCardClick}
      />
    </Modal>
  );
};

SearchModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
