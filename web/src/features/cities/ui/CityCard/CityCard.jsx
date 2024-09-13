import NextLink from "next/link";
import NextImage from "next/image";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Title } from "@/ui/data-display";
import styles from "./CityCard.module.css";

export const CityCard = ({ name, href, img, className }) => (
  <li className={clsx(styles.cityCard, className)}>
    <NextLink href={href}>
      <a className={styles.cityCardLinkBox}>
        <NextImage
          layout="fill"
          src={img}
          alt={name}
          className={styles.cityCardImg}
        />
        <div className={styles.cityCardOverlay}></div>
        <div className={styles.cityCardContent}>
          <Title order={3} color="white" className={styles.cityCardName}>
            {name}
          </Title>
        </div>
      </a>
    </NextLink>
  </li>
);

CityCard.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  img: PropTypes.object.isRequired,
  className: PropTypes.string,
};
