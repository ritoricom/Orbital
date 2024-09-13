import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { Container } from "@/ui/layout";
import { isEmptyArray } from "@/utils/equals";
import { Divider, Title } from "@/ui/data-display";
import { PhotosSlider } from "@/features/images/ui/PhotosSlider";

import styles from "./HotelPhotos.module.css";

export const HotelPhotos = ({ photos }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.hotelPhotos",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  if (isEmptyArray(photos)) {
    return null;
  }

  return (
    <div>
      <Container>
        <div className={styles.hotelPhotosContent}>
          {!isTablet && <Divider />}
          <Title
            order={isTablet ? (isMobile ? 2 : 3) : 2}
            color="primary"
            className={styles.hotelPhotosTitle}
          >
            {t("title")}
          </Title>
          <PhotosSlider photos={photos} />
        </div>
      </Container>
    </div>
  );
};

HotelPhotos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
