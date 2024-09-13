import PropTypes from "prop-types";

import { Container } from "@/ui/layout";
import { Divider } from "@/ui/data-display";
import { HistoryHotelInfo } from "./HistoryHotelInfo";
import { HistoryHotelCard } from "./HistoryHotelCard";
import { isLastInArray } from "@/utils/equals";
import { Fragment } from "react";

import styles from "./HistoryHotel.module.css";

export const HistoryHotel = ({ description, timelines }) => {
  const renderCards = timelines.map((timeline, index) => (
    <Fragment key={index}>
      <HistoryHotelCard year={timeline.year}>{timeline.text}</HistoryHotelCard>
      {!isLastInArray(timelines, index) && (
        <Divider
          orientation="vertical"
          className={styles.historyHotelDivider}
        />
      )}
    </Fragment>
  ));
  return (
    <div className={styles.historyHotel}>
      <Container>
        <div className={styles.historyHotelBox}>
          <HistoryHotelInfo>{description}</HistoryHotelInfo>
          <div className={styles.historyHotelFoot}>{renderCards}</div>
        </div>
      </Container>
    </div>
  );
};

HistoryHotel.propTypes = {
  description: PropTypes.string,
  timelines: PropTypes.array,
};
