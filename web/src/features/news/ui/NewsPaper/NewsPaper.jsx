import PropTypes from "prop-types";
import clsx from "clsx";

import { useDayjs } from "@/lib/dayjs";
import { HtmlContent } from "@/lib/html-content";
import { Paper, Text, Title } from "@/ui/data-display";
import { displayDate } from "@/utils/display";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";

import styles from "./NewsPaper.module.css";

export const NewsPaper = ({ title, description, publicationAt, className }) => {
  const dayjs = useDayjs();

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  return (
    <Paper className={clsx(styles.newsPaper, className)}>
      <div className={styles.newsPaperPublicationAtBox}>
        <Text
          color="white"
          variant="upS"
          className={styles.newsPaperPublicationAt}
        >
          {displayDate(dayjs, publicationAt, "DD MMM YYYY")}
        </Text>
      </div>
      <Title
        order={isMobile ? 5 : isTablet ? 5 : 3}
        color="primary"
        className={styles.newsPaperTitle}
      >
        {title}
      </Title>
      <HtmlContent className={styles.newsPaperDesc}>{description}</HtmlContent>
    </Paper>
  );
};
NewsPaper.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  publicationAt: PropTypes.string.isRequired,
  className: PropTypes.string,
};
