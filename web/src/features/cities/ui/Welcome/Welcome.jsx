import PropTypes from "prop-types";
import NextImage from "next/image";

import { Container } from "@/ui/layout";
import { WelcomeCard } from "./WelcomeCard";
import { useMediaQuery } from "@/lib/media";
import { useRouter } from "next/router";

import styles from "./Welcome.module.css";
import { S_BREAKPOINT_DOWN } from "@/config/breakpoints";
export const Welcome = ({
  desktopMapImg,
  tabletMapImg,
  mobileMapImg,
  cardImg,
  children,
}) => {
  const isTablet = useMediaQuery("(max-width: 1300px)");
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);
  const { locale } = useRouter();

  return (
    <div className={styles.welcome}>
      <div className={styles.welcomeMapWrapperImg}>
        <NextImage
          layout={!isMobile && "fill"}
          alt="map"
          src={
            (isTablet
              ? isMobile
                ? mobileMapImg
                : tabletMapImg
              : desktopMapImg)[locale]
          }
          className={styles.welcomeMapImg}
        />
      </div>
      {!isTablet && (
        <Container className={styles.welcomeContainer}>
          <WelcomeCard img={cardImg}>{children}</WelcomeCard>
        </Container>
      )}
    </div>
  );
};

Welcome.propTypes = {
  desktopMapImg: PropTypes.objectOf(PropTypes.object).isRequired,
  tabletMapImg: PropTypes.objectOf(PropTypes.object).isRequired,
  mobileMapImg: PropTypes.objectOf(PropTypes.object).isRequired,
  cardImg: PropTypes.object.isRequired,
  children: PropTypes.node,
};
