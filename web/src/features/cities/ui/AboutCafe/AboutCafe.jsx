import NextImage from "next/image";

import { Container } from "@/ui/layout";
import { Divider, Text } from "@/ui/data-display";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { PhotosSlider } from "../../../images/ui/PhotosSlider";

import styles from "./AboutCafe.module.css";

export const AboutCafe = ({ images, text }) => {
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const renderDescription = text.map((paragraph, index) => (
    <Text
      key={index}
      variant={isTablet ? "normalM" : "normalL"}
      color="secondary"
      className={styles.aboutCafeDescription}
    >
      {paragraph}
    </Text>
  ));

  const renderPhotos = images.map((img, index) => (
    <NextImage
      key={index}
      width="448px"
      height="350px"
      alt={img.alt}
      src={img.url}
      className={styles.aboutCafeImg}
    />
  ));

  return (
    <>
      <Container className={styles.aboutCafeContainer}>
        {!isTablet && <Divider />}
        <div className={styles.aboutCafe}>
          <div className={styles.aboutCafeTextBlock}>{renderDescription}</div>
          {isTablet ? (
            <PhotosSlider
              autoplay={true}
              className={styles.aboutCafeImgBlock}
              photos={images}
            />
          ) : (
            <div className={styles.aboutCafeImgBlock}>{renderPhotos}</div>
          )}
        </div>
      </Container>
    </>
  );
};
