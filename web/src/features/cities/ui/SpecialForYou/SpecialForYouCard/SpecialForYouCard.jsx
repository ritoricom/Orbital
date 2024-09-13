import NextLink from "next/link";
import NextImage from "next/image";
import PropTypes from "prop-types";

import { Title } from "@/ui/data-display";
import { useCity } from "@/features/cities";

import styles from "./SpecialForYouCard.module.css";

export const SpecialForYouCard = ({ specialOffer }) => {
  const { city } = useCity();

  return (
    <NextLink href={`${city}/special-offers/${specialOffer.id}`}>
      <a className={styles.specialForYouCard}>
        <NextImage
          layout="fill"
          src={specialOffer.cover.url}
          alt={specialOffer.title}
          className={styles.specialForYouCardImg}
        />
        <div className={styles.specialForYouCardOverlay} />
        <div className={styles.specialForYouCardContent}>
          <Title
            order={4}
            color="white"
            className={styles.specialForYouCardName}
          >
            {specialOffer.title}
          </Title>
        </div>
      </a>
    </NextLink>
  );
};

SpecialForYouCard.propTypes = {
  specialOffer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }),
};
