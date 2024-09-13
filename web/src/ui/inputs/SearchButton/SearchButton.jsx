import { CloseIcon } from "@/ui/icons";
import { SearchIcon } from "@/ui/icons/SearchIcon";
import { Input } from "../Input";
import clsx from "clsx";

import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";
import { useRef, useState, useDeferredValue } from "react";
import { useRouter } from "next/router";
import { SearchPopper, useSearch } from "@/features/search";

import styles from "./SearchButton.module.css";

export const SearchButton = ({ onOpen, onClose }) => {
  const [search, setSearch] = useState("");

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const [opened, setOpened] = useState(false);
  const handleOpenSearch = () => {
    setOpened(true);
    onOpen?.();
  };
  const handleCloseSearch = () => {
    setOpened(false);
    onClose?.();
  };

  const searchDeferred = useDeferredValue(search);

  const { locale } = useRouter();

  const { data } = useSearch({
    search: searchDeferred,
    lang: locale,
    queryConfig: { enabled: searchDeferred !== "" },
  });

  const anchorEl = useRef(null);

  const handleCloseInput = () => {
    setSearch("");
    handleCloseSearch();
  };
  const handleChangeInput = (event) => setSearch(event.target.value);

  const isSearchEmpty = searchDeferred === "";

  return (
    <>
      {!isTablet &&
        (opened ? (
          <>
            <Input
              startIcon={<SearchIcon />}
              endIcon={<CloseIcon />}
              onClickEndIcon={handleCloseInput}
              className={styles.searchInput}
              endIconClassName={styles.searchInputEndIcon}
              autoFocus={true}
              onChange={handleChangeInput}
              ref={anchorEl}
            />

            <SearchPopper
              specs={data?.specialOffers}
              news={data?.news}
              rooms={data?.rooms}
              leisures={data?.leisures}
              anchorEl={anchorEl}
              onClose={handleCloseInput}
              className={clsx(styles.popper, isSearchEmpty && styles.popperNon)}
            />
          </>
        ) : (
          <button onClick={handleOpenSearch} className={styles.searchButton}>
            <SearchIcon />
          </button>
        ))}
    </>
  );
};
