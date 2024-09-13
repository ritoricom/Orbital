import PropTypes from "prop-types";
import clsx from "clsx";

import { BurgerMenuIcon } from "@/ui/icons";
import { useState } from "react";
import { BurgerMenuModal } from "@/ui/layout";

import styles from "./BurgerMenu.module.css";

const burgerMenuColor = {
  primary: "primary",
  secondary: "secondary",
};

const getColorClassName = (color) => {
  switch (color) {
    case burgerMenuColor.primary:
      return styles.burgerMenuColorPrimary;
    case burgerMenuColor.secondary:
      return styles.burgerMenuColorSecondary;
  }
};

export const BurgerMenu = ({ сolor = "primary", contacts, className }) => {
  const [openBurgerMenuButton, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <button
        onClick={handleOpen}
        className={clsx(
          styles.burgerMenuButton,
          getColorClassName(сolor),
          className
        )}
      >
        <BurgerMenuIcon />
      </button>
      <BurgerMenuModal
        onClose={handleClose}
        open={openBurgerMenuButton}
        contacts={contacts}
      />
    </>
  );
};

BurgerMenu.propTypes = {
  сolor: PropTypes.oneOf(Object.values(burgerMenuColor)),
  contacts: PropTypes.object,
  className: PropTypes.string,
};
