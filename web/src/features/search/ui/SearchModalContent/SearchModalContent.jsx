import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { Divider, Title } from "@/ui/data-display";
import { isEmptyArray } from "@/utils/equals";
import { useCity } from "@/features/cities";
import { SearchCard } from "@/features/search";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";

import styles from "./SearchModalContent.module.css";

export const SearchModalContent = ({
  rooms,
  news,
  specs,
  leisures,
  onClickCard,
  className,
}) => {
  const { t } = useTranslation("search", {
    keyPrefix: "ui.searchModalContent",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);

  const { city } = useCity();

  const isEmptyData =
    specs &&
    isEmptyArray(specs) &&
    news &&
    isEmptyArray(news) &&
    rooms &&
    isEmptyArray(rooms) &&
    leisures &&
    isEmptyArray(leisures);

  return (
    <div className={clsx(styles.searchModalContent, className)}>
      {isEmptyData ? (
        <Title
          order={isTablet ? 4 : 6}
          className={styles.searchModalContentTitle}
        >
          {t("notFound")}
        </Title>
      ) : (
        <div>
          {specs && !isEmptyArray(specs) && (
            <div>
              <Title
                order={isTablet ? 4 : 6}
                className={styles.searchModalContentTitle}
              >
                {t("specialOffers")}
              </Title>
              {specs.map((spec) => (
                <>
                  <SearchCard
                    img={spec.cover}
                    title={spec.title}
                    key={spec.id}
                    href={`/${city}/special-offers/${spec.id}`}
                    hasImage
                    onClick={onClickCard}
                  />
                  <Divider
                    orientation="horizontal"
                    color="secondary"
                    className={styles.searchModalContentDivider}
                  />
                </>
              ))}
            </div>
          )}
          {rooms && !isEmptyArray(rooms) && (
            <div>
              <Title
                order={isTablet ? 4 : 6}
                className={styles.searchModalContentTitle}
              >
                {t("rooms")}
              </Title>
              {rooms.map((room) => (
                <>
                  <SearchCard
                    img={room.cover}
                    title={room.title}
                    key={room.id}
                    href={`/${room.city}/rooms/${room.id}`}
                    hasImage
                    usePlaceholderImg
                    hideText={false}
                    city={room.city && t(room.city)}
                    onClick={onClickCard}
                  />
                  <Divider
                    orientation="horizontal"
                    color="secondary"
                    className={styles.searchModalContentDivider}
                  />
                </>
              ))}
            </div>
          )}
          {news && !isEmptyArray(news) && (
            <div>
              <Title
                order={isTablet ? 4 : 6}
                className={styles.searchModalContentTitle}
              >
                {t("news")}
              </Title>
              {news.map((newArt) => (
                <>
                  <SearchCard
                    title={newArt.title}
                    key={newArt.id}
                    href={`/${newArt.city ? newArt.city : city}/news/${
                      newArt.id
                    }`}
                    city={newArt.city && t(newArt.city)}
                    onClick={onClickCard}
                  />
                  <Divider
                    orientation="horizontal"
                    color="secondary"
                    className={styles.searchModalContentDivider}
                  />
                </>
              ))}
            </div>
          )}

          {leisures && !isEmptyArray(leisures) && (
            <div>
              <Title
                order={isTablet ? 4 : 6}
                className={styles.searchModalContentTitle}
              >
                {t("leisures")}
              </Title>
              {leisures.map((leisure) => (
                <>
                  <SearchCard
                    title={leisure.title}
                    key={leisure.id}
                    href={`/obn/leisures/${leisure.id}`}
                    onClick={onClickCard}
                  />
                  <Divider
                    orientation="horizontal"
                    color="secondary"
                    className={styles.searchModalContentDivider}
                  />
                </>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
