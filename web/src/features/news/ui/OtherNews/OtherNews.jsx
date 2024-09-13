import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { Divider, Title } from "@/ui/data-display";
import { isEmptyArray } from "@/utils/equals";
import { NewsCard, NewsCardGrid } from "@/features/news";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

import styles from "./OtherNews.module.css";

export const OtherNews = ({ news, className }) => {
  const { t } = useTranslation("news", {
    keyPrefix: "ui.otherNews",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  if (isEmptyArray(news)) {
    return null;
  }

  return (
    <div className={className}>
      {!isTablet && <Divider className={styles.otherNewsDivider} />}
      <Title
        order={isTablet ? 4 : 2}
        color="primary"
        className={styles.otherNewsTitle}
      >
        {t("title")}
      </Title>
      <NewsCardGrid>
        {news.map((newsArticle) => (
          <NewsCard key={newsArticle.id} news={newsArticle} />
        ))}
      </NewsCardGrid>
    </div>
  );
};

OtherNews.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  className: PropTypes.string,
};
