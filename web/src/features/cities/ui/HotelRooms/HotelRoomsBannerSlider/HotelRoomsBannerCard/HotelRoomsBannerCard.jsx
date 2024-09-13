import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";
import NextImage from "next/image";
import { SplideSlide } from "@splidejs/react-splide";
import NextLink from "next/link";

import { Text, Title } from "@/ui/data-display";
import { Button } from "@/ui/inputs";
import { useCity } from "@/features/cities";

import placeholder from "@/assets/images/room-placeholder.png";
import styles from "./HotelRoomsBannerCard.module.css";
import { useMediaQuery } from "@/lib/media";
import {
  XL_BREAKPOINT_DOWN,
  S_BREAKPOINT_DOWN,
  L_BREAKPOINT_DOWN,
} from "@/config/breakpoints";
import { Multiline } from "@/lib/multiline";

export const HotelRoomsBannerCard = ({ room }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.hotelRooms.hotelRoomsBannerSlider.hotelRoomsBannerCard",
  });

  const isLaptop = useMediaQuery(XL_BREAKPOINT_DOWN);
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  const { city } = useCity();

  return (
    <SplideSlide>
      <div className={styles.hotelRoomsBannerCard}>
        <div className={styles.hotelRoomsBannerCardImgBlock}>
          <NextImage
            layout="fill"
            alt={room.title}
            src={room.cover ? room.cover.url : placeholder}
            className={styles.hotelRoomsBannerCardImg}
          />
        </div>
        {!isLaptop && (
          <Text
            variant="normalM"
            color="tertiary"
            className={styles.hotelRoomsBannerCardFootnote}
          >
            {t("footnote")}
          </Text>
        )}

        <div className={styles.hotelRoomsBannerCardTextBlock}>
          <div>
            <Title
              order={isTablet ? (isMobile ? 4 : 6) : 3}
              color="primary"
              className={styles.hotelRoomsBannerCardTitle}
            >
              {room.title}
            </Title>

            <Text
              variant={isTablet ? "normalS" : "normalL"}
              className={styles.hotelRoomsBannerCardDescription}
            >
              {room.description ? (
                <Multiline>{room.description}</Multiline>
              ) : (
                t("noDescription")
              )}
            </Text>
          </div>

          <NextLink passHref href={`/${city}/rooms/${room.id}`}>
            <Button
              uppercase
              color="secondaryLight"
              size={isTablet ? "s" : "l"}
              fullWidth={isMobile}
              className={styles.hotelRoomsBannerCardButton}
            >
              {t("button")}
            </Button>
          </NextLink>
        </div>
        {isLaptop && (
          <Text
            variant="normalS"
            color="tertiary"
            className={styles.hotelRoomsBannerCardFootnote}
          >
            {t("footnote")}
          </Text>
        )}
      </div>
    </SplideSlide>
  );
};

HotelRoomsBannerCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }),
};
