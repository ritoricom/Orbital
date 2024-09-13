import { useTranslation } from "next-i18next";
import clsx from "clsx";

import NextImage from "next/image";
import { Container } from "@/ui/layout";
import { CallMeBackForm } from "@/features/misc";
import { Title, Text } from "@/ui/data-display";
import styles from "./CallMeBack.module.css";
import { useMediaQuery } from "@/lib/media";
import { S_BREAKPOINT_DOWN } from "@/config/breakpoints";

export const CallMeBack = ({ children, backImg }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.callMeBack",
  });

  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <div className={styles.callMeBackWrapper}>
      <div className={styles.callMeBack}>
        {!isMobile && (
          <div className={styles.callMeBackWrapperImg}>
            <NextImage
              layout="fill"
              alt="hotel"
              src={backImg}
              className={styles.callMeBackImg}
            />
          </div>
        )}
        <Container className={styles.callMeBackContainer}>
          <div className={clsx(styles.callMeBackFields, styles.callMeBackForm)}>
            <Title
              order={2}
              color="primary"
              className={styles.callMeBackFormTitle}
            >
              {t("title")}
            </Title>
            <Text
              variant="normalM"
              color="secondary"
              className={styles.callMeBackFormDescription}
            >
              {children}
            </Text>
            <CallMeBackForm />
          </div>
        </Container>
      </div>
    </div>
  );
};
