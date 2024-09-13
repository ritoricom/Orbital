import PropTypes from "prop-types";
import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { Divider } from "@/ui/data-display";
import { Link } from "@/ui/navigation";

import styles from "./SwitchLang.module.css";

const switchLangColor = {
  dark: "dark",
  light: "light",
};

const getColorClassName = (color) => {
  switch (color) {
    case switchLangColor.dark:
      return styles.switchLangDividerDark;
    case switchLangColor.light:
      return styles.switchLangDividerLight;
  }
};

export const SwitchLang = ({ color = "light", className }) => {
  const { asPath, locale } = useRouter();

  return (
    <div className={clsx(styles.switchLang, className)}>
      <NextLink passHref href={asPath} locale="ru">
        <Link active={locale === "ru"} color={color} size="s">
          RU
        </Link>
      </NextLink>
      <Divider
        flexItem
        orientation="vertical"
        className={getColorClassName(color)}
      />
      <NextLink passHref href={asPath} locale="en">
        <Link active={locale === "en"} color={color} size="s">
          EN
        </Link>
      </NextLink>
    </div>
  );
};

SwitchLang.propTypes = {
  color: PropTypes.oneOf(Object.values(switchLangColor)),
  className: PropTypes.string,
};
