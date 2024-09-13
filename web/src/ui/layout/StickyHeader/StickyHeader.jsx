import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import { Transition } from "react-transition-group";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { BookingPanel, scrollToBookingPanel } from "@/lib/bnovo";
import { Teleport } from "@/lib/teleport";
import { BurgerMenu, Container, Logo } from "@/ui/layout";
import { Button } from "@/ui/inputs";

import styles from "./StickyHeader.module.css";
import { useMediaQuery } from "@/lib/media";

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

export const StickyHeader = ({
  withBurgerMenu = true,
  className,
  children,
}) => {
  const { t } = useTranslation("common");

  const nodeRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleClickBooking = () => {
    scrollToBookingPanel();
  };

  const isLaptop = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Teleport selector="body">
      <Transition
        unmountOnExit
        nodeRef={nodeRef}
        in={visible}
        timeout={duration}
      >
        {(state) => (
          <header
            className={clsx(styles.stickyHeader, className)}
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <Container>
              <div className={styles.stickyHeaderInner}>
                {!isLaptop && (
                  <>
                    <Logo color="primary" className={styles.stickyHeaderLogo} />
                    {children}
                  </>
                )}

                {isLaptop ? (
                  <>
                    <BookingPanel
                      withContainer={false}
                      isSticky
                      className={styles.stickyHeaderBookingPanel}
                    />
                    {withBurgerMenu && <BurgerMenu сolor="secondary" />}
                  </>
                ) : (
                  <Button
                    color="primary"
                    size={isLaptop ? "s" : "m"}
                    uppercase
                    onClick={handleClickBooking}
                  >
                    {t("components.layout.stickyHeader.button")}
                  </Button>
                )}
              </div>
            </Container>
          </header>
        )}
      </Transition>
    </Teleport>
  );
};

StickyHeader.propTypes = {
  withBurgerMenu: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
