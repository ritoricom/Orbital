import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
import clsx from "clsx";

import { documentDisableScroll, documentEnabledScroll } from "@/utils/dom";
import { Teleport } from "@/lib/teleport";

import styles from "./Modal.module.css";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export const Modal = ({
  open,
  root = true,
  fullHeight = false,
  onClose,
  children,
  className,
}) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const handleClose = (event) => {
      if (event.code == "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleClose);

    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  });

  useEffect(
    () => () => {
      if (!open && root) documentEnabledScroll();
    },
    [open, root]
  );

  const handleEntering = () => {
    root && documentDisableScroll();
  };

  const handleExited = () => {
    root && documentEnabledScroll();
  };

  return (
    <Teleport selector="#modal">
      <Transition
        unmountOnExit
        nodeRef={nodeRef}
        in={open}
        timeout={duration}
        onEntering={handleEntering}
        onExited={handleExited}
      >
        {(state) => (
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            className={clsx(styles.modal, fullHeight && styles.modalFullHeight)}
          >
            <div className={styles.modalOverlay} onClick={onClose} />
            <div
              className={clsx(
                styles.modalBody,
                fullHeight && styles.modalBodyFullHeight,
                className
              )}
            >
              {children}
            </div>
          </div>
        )}
      </Transition>
    </Teleport>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  root: PropTypes.bool,
  fullHeight: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
