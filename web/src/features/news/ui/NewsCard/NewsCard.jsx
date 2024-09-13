import NextImage from "next/image";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";

import { useDayjs } from "@/lib/dayjs";
import { Title } from "@/ui/data-display";
import { Button } from "@/ui/inputs";
import { displayDate } from "@/utils/display";
import { useCity } from "@/features/cities";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import styles from "./NewsCard.module.css";

export const NewsCard = ({ news, className }) => {
  const { t } = useTranslation("news", {
    keyPrefix: "ui.newsCard",
  });
  const { city } = useCity();

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const dayjs = useDayjs();

  return (
    <li className={clsx(styles.newsCard, className)}>
      <div className={styles.newsCardCoverContainer}>
        <NextImage
          layout="fill"
          src={news.cover.url}
          alt={news.title}
          className={styles.newsCardCover}
        />
        <div className={styles.newsCardCoverContent}>
          <div className={styles.newsCardPublicationAt}>
            <Title order={4} className={styles.newsCardPublicationDay}>
              {displayDate(dayjs, news.publicationAt, "DD")}
            </Title>
            <Title order={6} className={styles.newsCardPublicationMonth}>
              {displayDate(dayjs, news.publicationAt, "MMM")}
            </Title>
          </div>
        </div>
      </div>
      <div className={styles.newsCardContent}>
        <Title order={isTablet ? 6 : 4} className={styles.newsCardTitle}>
          {news.title}
        </Title>
        <NextLink passHref href={`/${city}/news/${news.id}`}>
          <Button
            uppercase
            size={isTablet ? "s" : "m"}
            component="a"
            className={styles.newsCardButton}
          >
            {t("more")}
          </Button>
        </NextLink>
      </div>
    </li>
  );
};

NewsCard.propTypes = {
  news: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publicationAt: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }),
  className: PropTypes.string,
};
