import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

import { Container } from "@/ui/layout";
import { isEmptyArray } from "@/utils/equals";
import { Divider, Title } from "@/ui/data-display";
import { HotelRoomsSlider } from "./HotelRoomsSlider";

import styles from "./HotelRooms.module.css";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";

export const HotelRooms = ({ rooms }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.hotelRooms",
  });

  const isLaptop = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  if (isEmptyArray(rooms)) {
    return null;
  }

  return (
    <div>
      <Container className={styles.hotelRoomsContainer}>
        {!isLaptop && <Divider />}

        <Title
          order={isLaptop ? (isMobile ? 2 : 3) : 2}
          color="primary"
          className={styles.hotelRoomsTitle}
        >
          {t("title")}
        </Title>

        <HotelRoomsSlider rooms={rooms} />
      </Container>
    </div>
  );
};

HotelRooms.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
