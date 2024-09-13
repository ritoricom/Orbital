import PropTypes from "prop-types";
import clsx from "clsx";

import { Title } from "@/ui/data-display";
import { CloseIcon, CloseIconBold } from "@/ui/icons";
import { useMediaQuery } from "@/lib/media";
import { S_BREAKPOINT_DOWN } from "@/config/breakpoints";

import styles from "./ModalHeader.module.css";

const modalCloseIconVariant = {
  bold: "bold",
  normal: "normal",
};

const getCloseIcon = (variant) => {
  switch (variant) {
    case modalCloseIconVariant.bold:
      return <CloseIconBold />;
    case modalCloseIconVariant.normal:
      return <CloseIcon />;
  }
};

export const ModalHeader = ({
  title,
  closeIconVariant = "normal",
  titleProps,
  closeButtonProps,
  onClose,
  className,
}) => {
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <div className={clsx(styles.modalHeader, className)}>
      <Title
        order={isMobile ? 3 : 4}
        color="secondary"
        {...titleProps}
        className={clsx(styles.modalHeaderTitle, titleProps?.className)}
      >
        {title}
      </Title>

      <button
        {...closeButtonProps}
        className={clsx(
          styles.modalHeaderCloseBtn,
          closeButtonProps?.className
        )}
        onClick={onClose}
      >
        {getCloseIcon(closeIconVariant)}
      </button>
    </div>
  );
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  closeIconVariant: PropTypes.oneOf(Object.values(modalCloseIconVariant)),
  titleProps: PropTypes.object,
  closeButtonProps: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};
