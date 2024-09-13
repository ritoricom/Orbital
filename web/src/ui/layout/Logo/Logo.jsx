import PropTypes from "prop-types";
import clsx from "clsx";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";

import { Link } from "@/ui/navigation";

import styles from "./Logo.module.css";

const logoColor = {
  primary: "primary",
  secondary: "secondary",
};

const getColorClassName = (color) => {
  switch (color) {
    case logoColor.secondary:
      return styles.logoColorSecondary;
    case logoColor.primary:
      return styles.logoColorPrimary;
  }
};

export const Logo = ({ color = "secondary", className }) => {
  const { t } = useTranslation("common");

  return (
    <NextLink passHref href="/">
      <Link
        size="l"
        uppercase
        className={clsx(getColorClassName(color), styles.logo, className)}
      >
        {t("components.layout.logo")}
      </Link>
    </NextLink>
  );
};

Logo.propTypes = {
  color: PropTypes.oneOf(Object.values(logoColor)).isRequired,
  className: PropTypes.string,
};
