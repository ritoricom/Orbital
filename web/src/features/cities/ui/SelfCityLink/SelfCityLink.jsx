import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import { useCity } from "@/features/cities";
import { BreadcrumbsLink } from "@/ui/data-display";

export const SelfCityLink = ({ className }) => {
  const { t } = useTranslation("cities", {
    keyPrefix: "ui.selfCityLink",
  });
  const { city } = useCity();

  return (
    <BreadcrumbsLink disabled={false} href={`/${city}`} className={className}>
      {t("text")}
    </BreadcrumbsLink>
  );
};

SelfCityLink.propTypes = {
  className: PropTypes.string,
};
