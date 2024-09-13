import NextImage from "next/image";
import NextLink from "next/link";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Title } from "@/ui/data-display";
import { useCity } from "@/features/cities";

import placeholder from "@/assets/images/room-placeholder.png";
import styles from "./RoomCard.module.css";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

export const RoomCard = ({ room, className }) => {
  const { city } = useCity();
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <li className={clsx(styles.roomCard, className)}>
      <NextLink href={`/${city}/rooms/${room.id}`}>
        <a className={styles.roomCardLinkBox}>
          <NextImage
            layout="fill"
            src={room.cover ? room.cover.url : placeholder}
            alt={room.title}
            className={styles.roomCardCover}
          />
          <div className={styles.roomCardOverlay}></div>
          <div className={styles.roomCardContent}>
            <Title
              color="white"
              order={isTablet ? 5 : 4}
              className={styles.roomCardTitle}
            >
              {room.title}
            </Title>
          </div>
        </a>
      </NextLink>
    </li>
  );
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }),
  className: PropTypes.string,
};
