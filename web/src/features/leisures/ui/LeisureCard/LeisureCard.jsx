import NextLink from "next/link";
import NextImage from "next/image";
import PropTypes from "prop-types";
import clsx from "clsx";

import { S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";
import { Title } from "@/ui/data-display";

import styles from "./LeisureCard.module.css";

export const LeisureCard = ({ leisure, titleClassName, className }) => {
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <li className={clsx(styles.leisureCard, className)}>
      <NextLink href={`/obn/leisures/${leisure.id}`}>
        <a className={styles.leisureCardLinkBox}>
          <NextImage
            layout="fill"
            src={leisure.cover.url}
            alt={leisure.title}
            className={styles.leisureCardImg}
          />
          <div className={styles.leisureCardOverlay}></div>
          <div className={styles.leisureCardContent}>
            <Title
              order={isMobile ? 3 : 4}
              color="white"
              className={clsx(styles.leisureCardName, titleClassName)}
            >
              {leisure.title}
            </Title>
          </div>
        </a>
      </NextLink>
    </li>
  );
};

LeisureCard.propTypes = {
  leisure: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }),
  titleClassName: PropTypes.string,
  className: PropTypes.string,
};
