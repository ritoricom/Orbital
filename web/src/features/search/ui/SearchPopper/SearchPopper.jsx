import { useRef } from "react";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { usePopper } from "react-popper";

import { Divider, Title } from "@/ui/data-display";
import { isEmptyArray } from "@/utils/equals";
import { useCity } from "@/features/cities";
import { SearchCard } from "@/features/search";
import { Teleport } from "@/lib/teleport";
import { useOnClickOutside } from "@/hooks";

import styles from "./SearchPopper.module.css";

export const SearchPopper = ({
  rooms,
  news,
  specs,
  leisures,
  anchorEl,
  onClose,
  className,
}) => {
  const { t } = useTranslation("search", {
    keyPrefix: "ui.searchPopper",
  });

  const ref = useRef(null);

  useOnClickOutside(ref, onClose, [anchorEl]);

  const { styles: localStyles, attributes } = usePopper(
    anchorEl.current,
    ref.current,
    {
      placement: "bottom-start",
      modifiers: {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    }
  );

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
    <Teleport selector="body">
      <div
        ref={ref}
        style={localStyles.popper}
        className={clsx(styles.searchPopper, className)}
        {...attributes.popper}
      >
        {isEmptyData ? (
          <Title order={6} className={styles.searchPopperTitle}>
            {t("notFound")}
          </Title>
        ) : (
          <div className={styles.searchPopperContainer}>
            {specs && !isEmptyArray(specs) && (
              <div>
                <Title order={6} className={styles.searchPopperTitle}>
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
                      onClick={onClose}
                    />
                    <Divider
                      orientation="horizontal"
                      color="secondary"
                      className={styles.searchPopperDivider}
                    />
                  </>
                ))}
              </div>
            )}
            {rooms && !isEmptyArray(rooms) && (
              <div>
                <Title order={6} className={styles.searchPopperTitle}>
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
                      onClick={onClose}
                    />
                    <Divider
                      orientation="horizontal"
                      color="secondary"
                      className={styles.searchPopperDivider}
                    />
                  </>
                ))}
              </div>
            )}
            {news && !isEmptyArray(news) && (
              <div>
                <Title order={6} className={styles.searchPopperTitle}>
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
                      onClick={onClose}
                    />
                    <Divider
                      orientation="horizontal"
                      color="secondary"
                      className={styles.searchPopperDivider}
                    />
                  </>
                ))}
              </div>
            )}

            {leisures && !isEmptyArray(leisures) && (
              <div>
                <Title order={6} className={styles.searchPopperTitle}>
                  {t("leisures")}
                </Title>
                {leisures.map((leisure) => (
                  <>
                    <SearchCard
                      title={leisure.title}
                      key={leisure.id}
                      href={`/obn/leisures/${leisure.id}`}
                      onClick={onClose}
                    />
                    <Divider
                      orientation="horizontal"
                      color="secondary"
                      className={styles.searchPopperDivider}
                    />
                  </>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Teleport>
  );
};

SearchPopper.displayName = "SearchPopper";
