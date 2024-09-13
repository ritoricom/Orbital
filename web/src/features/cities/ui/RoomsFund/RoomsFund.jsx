import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { Container } from "@/ui/layout";
import { isEmptyArray } from "@/utils/equals";
import { Title, Divider } from "@/ui/data-display";
import { Button } from "@/ui/inputs";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { RoomCard, RoomCardGrid, ROOMS_PAGE_SIZE } from "@/features/rooms";
import { useCity } from "@/features/cities";

import styles from "./RoomsFund.module.css";

export const RoomsFund = ({ rooms }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.roomsFund",
  });

  const { city } = useCity();
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  if (isEmptyArray(rooms)) {
    return null;
  }

  return (
    <Container className={styles.roomsFundContainer}>
      {!isTablet && <Divider />}
      <Title
        order={isTablet ? 4 : 2}
        color="primary"
        className={styles.roomsFundTitle}
      >
        {t("title")}
      </Title>
      <RoomCardGrid>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </RoomCardGrid>
      {rooms.length === ROOMS_PAGE_SIZE && (
        <NextLink passHref href={`/${city}/rooms`}>
          <Button
            uppercase
            color="secondaryDark"
            size={isTablet ? "m" : "xl"}
            className={styles.roomsFundButton}
            fullWidth
          >
            {t("button")}
          </Button>
        </NextLink>
      )}
    </Container>
  );
};

RoomsFund.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object),
};
