import PropTypes from "prop-types";
import clsx from "clsx";
import NextLink from "next/link";
import NextImage from "next/image";

import { Text } from "@/ui/data-display";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";

import styles from "./SearchCard.module.css";
import placeholder from "@/assets/images/room-placeholder.png";

export const SearchCard = ({
  hasImage = false,
  usePlaceholderImg = false,
  hideText = true,
  title,
  href,
  city,
  img,
  onClick,
  className,
}) => {
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  return (
    <NextLink passHref href={href}>
      <div
        className={clsx(styles.searchCardContainer, className)}
        onClick={onClick}
      >
        {hasImage && (
          <div className={styles.searchCardImageContainer}>
            <NextImage
              width={isTablet ? 44 : 52}
              height={isTablet ? 44 : 52}
              src={usePlaceholderImg ? (img ? img.url : placeholder) : img.url}
              alt={title}
              className={styles.searchCardImage}
            />
          </div>
        )}
        <div className={styles.searchCardTextBlock}>
          {city && (
            <Text
              variant={isTablet ? "normalS" : "normalM"}
              color="secondary"
              className={styles.searchCardCity}
            >
              {city}
            </Text>
          )}
          <div className={hideText && styles.searchCardHideText}>
            <Text
              variant={isTablet ? "normalS" : "normalM"}
              color="secondary"
              className={styles.searchCardText}
            >
              {title}
            </Text>
          </div>
        </div>
      </div>
    </NextLink>
  );
};

SearchCard.propTypes = {
  hasImage: PropTypes.bool,
  usePlaceholderImg: PropTypes.bool,
  hideText: PropTypes.bool,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  city: PropTypes.string,
  img: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
