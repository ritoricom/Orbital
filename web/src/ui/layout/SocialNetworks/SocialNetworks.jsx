import PropTypes from "prop-types";
import clsx from "clsx";

import { VkIcon } from "@/ui/icons";

import styles from "./SocialNetworks.module.css";

const socialNetworksColor = {
  dark: "dark",
  light: "light",
};

const getColorClassName = (color) => {
  switch (color) {
    case socialNetworksColor.dark:
      return styles.socialNetworksDark;
    case socialNetworksColor.light:
      return styles.socialNetworksLight;
  }
};

export const SocialNetworks = ({ vk, color = "light", className }) => (
  <div className={clsx(styles.socialNetworks, className)}>
    <a
      href={vk}
      target="_blank"
      rel="noreferrer"
      className={clsx(styles.socialNetworksPointer, getColorClassName(color))}
    >
      <VkIcon />
    </a>
  </div>
);

SocialNetworks.propTypes = {
  vk: PropTypes.string,
  color: PropTypes.oneOf(Object.values(socialNetworksColor)),
  className: PropTypes.string,
};
