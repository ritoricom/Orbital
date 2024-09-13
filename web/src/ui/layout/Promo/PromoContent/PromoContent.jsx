import PropTypes from "prop-types";
import clsx from "clsx";

import { Container } from "@/ui/layout";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import styles from "./PromoContent.module.css";

const promoContentSpacing = {
  l: "l",
  m: "m",
  s: "s",
  xs: "xs",
};

const getContentSpacingClassName = (spacing) => {
  switch (spacing) {
    case promoContentSpacing.l:
      return styles.promoContentSpacingL;
    case promoContentSpacing.m:
      return styles.promoContentSpacingM;
    case promoContentSpacing.s:
      return styles.promoContentSpacingS;
    case promoContentSpacing.xs:
      return styles.promoContentSpacingXs;
  }
};

export const PromoContent = ({
  desktopCenter = false,
  spacing,
  className,
  children,
}) => {
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <div>
      <Container>
        <div
          className={clsx(
            styles.promoContent,
            desktopCenter && !isTablet && styles.promoContentCenter,
            getContentSpacingClassName(spacing),
            className
          )}
        >
          {children}
        </div>
      </Container>
    </div>
  );
};

PromoContent.propTypes = {
  desktopCenter: PropTypes.bool,
  spacing: PropTypes.oneOf(Object.values(promoContentSpacing)).isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
