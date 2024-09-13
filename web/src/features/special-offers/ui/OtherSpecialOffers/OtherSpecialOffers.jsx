import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Divider, Title } from "@/ui/data-display";
import { isEmptyArray } from "@/utils/equals";
import {
  SpecialOfferCard,
  SpecialOfferCardGrid,
} from "@/features/special-offers";
import { L_BREAKPOINT_DOWN, S_BREAKPOINT_DOWN } from "@/config/breakpoints";
import { useMediaQuery } from "@/lib/media";

import styles from "./OtherSpecialOffers.module.css";

export const OtherSpecialOffers = ({ specialOffers, className }) => {
  const { t } = useTranslation("special-offers", {
    keyPrefix: "ui.otherSpecialOffers",
  });

  const isTablet = useMediaQuery(L_BREAKPOINT_DOWN);
  const isMobile = useMediaQuery(S_BREAKPOINT_DOWN);

  if (isEmptyArray(specialOffers)) {
    return null;
  }

  return (
    <div className={clsx(styles.otherSpecialOffers, className)}>
      {!isTablet && <Divider className={styles.otherSpecialOffersDivider} />}
      <Title
        order={isTablet ? (isMobile ? 2 : 3) : 2}
        color="primary"
        className={styles.otherSpecialOffersTitle}
      >
        {t("title")}
      </Title>
      <SpecialOfferCardGrid>
        {specialOffers.map((specialOffer) => (
          <SpecialOfferCard key={specialOffer.id} specialOffer={specialOffer} />
        ))}
      </SpecialOfferCardGrid>
    </div>
  );
};

OtherSpecialOffers.propTypes = {
  specialOffers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  className: PropTypes.string,
};
