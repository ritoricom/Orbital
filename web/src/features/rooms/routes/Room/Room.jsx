import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { SEO } from "@/lib/meta";
import { BookingPanel } from "@/lib/bnovo";
import {
  Container,
  Footer,
  FooterContacts,
  Header,
  Main,
  Promo,
  PromoBreadcrumbs,
  PromoContent,
  PromoTitle,
  StickyHeader,
  HeaderContent,
} from "@/ui/layout";
import { BreadcrumbsLink } from "@/ui/data-display";
import { SmartImageSlider } from "@/features/images";
import {
  CityNavbar,
  SelfCityLink,
  useCity,
  StickyCityNavbar,
} from "@/features/cities";
import {
  RoomPaper,
  RoomPeculiarities,
  RoomPrice,
  RoomsSlider,
} from "@/features/rooms";

import { getPromoImgByCity } from "@/utils/promo";
import placeholder from "@/assets/images/room-placeholder.png";
import styles from "./Room.module.css";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

const getCurrenIdxRoom = (rooms, room) =>
  rooms.findIndex(({ id }) => room.id === id);

const getImagesFromRoom = (room) => {
  switch (true) {
    case room.images.length !== 0:
      return room.images;
    case !!room.cover:
      return [room.cover];
    default:
      return [{ url: placeholder }];
  }
};

export const Room = ({ room, rooms, contacts }) => {
  const { t } = useTranslation("rooms", {
    keyPrefix: "routes.room",
  });
  const router = useRouter();

  const { city } = useCity();
  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const images = getImagesFromRoom(room);
  const currentRoomIndex = getCurrenIdxRoom(rooms, room);

  const handleMove = (room) => {
    router.push(`/${city}/rooms/${room.id}`, undefined, {
      scroll: false,
    });
  };

  return (
    <>
      <SEO title={room.title} />
      <Promo img={getPromoImgByCity(city)}>
        <Header>
          <HeaderContent contacts={contacts} />
        </Header>
        <StickyHeader>
          <StickyCityNavbar />
        </StickyHeader>
        <CityNavbar />
        <PromoContent
          desktopCenter
          spacing="s"
          className={styles.roomPromoSpacing}
        >
          <PromoTitle hasWidthLimit={false} order={isTablet ? 3 : 2}>
            {room.title}
          </PromoTitle>
          <PromoBreadcrumbs>
            <SelfCityLink />
            <BreadcrumbsLink href={`/${city}/rooms`}>
              {t("title")}
            </BreadcrumbsLink>
            <BreadcrumbsLink href={router.asPath} disabled>
              {room.title}
            </BreadcrumbsLink>
          </PromoBreadcrumbs>
        </PromoContent>
      </Promo>
      <Main>
        <BookingPanel />
        <Container className={styles.roomContainer}>
          <div className={styles.roomInner}>
            {rooms.length > 1 && (
              <RoomsSlider
                rooms={rooms}
                start={currentRoomIndex}
                onMove={handleMove}
              />
            )}
            <div className={styles.roomInfo}>
              <SmartImageSlider
                images={images}
                disclaimer={!isTablet && t("sliderDisclaimer")}
                className={styles.roomSlider}
                imgClassName={styles.roomSliderImg}
              />
              <RoomPaper
                description={room.description}
                title={room.title}
                price={room.price}
              />
            </div>
            <RoomPeculiarities peculiarities={room.peculiarities} />
            {isTablet && <RoomPrice price={room.price} />}
          </div>
        </Container>
      </Main>
      <Footer>
        <FooterContacts contacts={contacts} />
      </Footer>
    </>
  );
};

Room.propTypes = {
  room: PropTypes.object.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
