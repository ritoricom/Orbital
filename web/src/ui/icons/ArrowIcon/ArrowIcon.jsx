import PropTypes from "prop-types";
import clsx from "clsx";

import { Icon } from "@/ui/icons";

import styles from "./ArrowIcon.module.css";

const arrowIconDirection = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
};

const getIconDirectionClassName = (direction) => {
  switch (direction) {
    case arrowIconDirection.left:
      return styles.arrowIconDirectionLeft;
    case arrowIconDirection.right:
      return styles.arrowIconDirectionRight;
    case arrowIconDirection.top:
      return styles.arrowIconDirectionTop;
    case arrowIconDirection.bottom:
      return styles.arrowIconDirectionBottom;
  }
};
export const ArrowIcon = ({ direction = "right", className }) => (
  <Icon
    width={22}
    height={22}
    viewBox="0 0 22 22"
    className={clsx(getIconDirectionClassName(direction), className)}
  >
    <path d="M7.88385 15.9501C7.68524 15.7515 7.58594 15.5071 7.58594 15.2168C7.58594 14.9265 7.68524 14.6821 7.88385 14.4834L11.3672 11.0001L7.88385 7.51678C7.68524 7.31817 7.58594 7.07373 7.58594 6.78345C7.58594 6.49317 7.68524 6.24872 7.88385 6.05011C8.08247 5.8515 8.32691 5.7522 8.61719 5.7522C8.90747 5.7522 9.15191 5.8515 9.35052 6.05011L13.5672 10.2668C13.6741 10.3737 13.7505 10.4883 13.7964 10.6105C13.8422 10.7328 13.8651 10.8626 13.8651 11.0001C13.8651 11.1376 13.8422 11.2675 13.7964 11.3897C13.7505 11.5119 13.6741 11.6265 13.5672 11.7334L9.35052 15.9501C9.15191 16.1487 8.90747 16.248 8.61719 16.248C8.32691 16.248 8.08247 16.1487 7.88385 15.9501Z" />
  </Icon>
);

ArrowIcon.propTypes = {
  direction: PropTypes.oneOf(Object.values(arrowIconDirection)).isRequired,
  className: PropTypes.string,
};
