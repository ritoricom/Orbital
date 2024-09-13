import { useTranslation } from "next-i18next";
import { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { Button } from "@/ui/inputs";
import { ArrowIcon } from "@/ui/icons";
import { CitiesModal, useCity } from "@/features/cities";

import styles from "./CitiesLink.module.css";

const citiesLinkColor = {
  dark: "dark",
  light: "light",
};

const getColorClassName = (color) => {
  switch (color) {
    case citiesLinkColor.dark:
      return styles.citiesLinkColorDark;
    case citiesLinkColor.light:
      return styles.citiesLinkColorLight;
  }
};

export const CitiesLink = ({ color = "primary", root = true }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.сitiesLink",
  });

  const { city } = useCity();

  const [openCitiesLink, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        uppercase
        size="s"
        endIcon={
          <ArrowIcon
            direction={"bottom"}
            className={styles.citiesLinkButtonIcon}
          />
        }
        className={clsx(styles.citiesLinkButton, getColorClassName(color))}
        onClick={handleOpen}
      >
        {t(city)}
      </Button>
      <CitiesModal open={openCitiesLink} root={root} onClose={handleClose} />
    </>
  );
};

Button.propTypes = {
  root: PropTypes.bool,
  color: PropTypes.oneOf(Object.values(citiesLinkColor)),
};
