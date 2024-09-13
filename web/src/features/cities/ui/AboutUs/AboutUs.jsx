import NextImage from "next/image";
import { useTranslation } from "next-i18next";
import { Divider } from "@/ui/data-display";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { Container } from "@/ui/layout";
import { Text, Title } from "@/ui/data-display";

import styles from "./AboutUs.module.css";

export const AboutUs = ({ img, text }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.aboutUs",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const renderDescription = text.map((paragraph, index) => (
    <Text
      key={index}
      variant={isTablet ? "normalM" : "normalL"}
      color="secondary"
      className={styles.aboutUsDescription}
    >
      {paragraph}
    </Text>
  ));

  return (
    <>
      <Container className={styles.aboutUs}>
        <NextImage
          width="569px"
          height="423px"
          alt={img.alt}
          src={img.src}
          className={styles.aboutUsImg}
        />
        <div className={styles.aboutUsTextBlock}>
          {!isTablet && <Divider />}
          <Title
            order={isTablet ? 3 : 2}
            color="primary"
            className={styles.aboutUsTitle}
          >
            {t("title")}
          </Title>
          {renderDescription}
        </div>
      </Container>
    </>
  );
};
