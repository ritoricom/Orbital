import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { getLineClamp } from "@/utils/styles";
import { SpoilerButton } from "./SpoilerButton";

export const Spoiler = ({ children, maxLineClamp }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "components.dataDisplay.spoiler",
  });

  const [lineClamp, setLineClamp] = useState(maxLineClamp);

  const isNonEmpty = lineClamp !== null;

  const handleClick = () => {
    setLineClamp(null);
  };

  return (
    <>
      <div
        style={{
          ...(isNonEmpty && getLineClamp(lineClamp)),
        }}
      >
        {children}
      </div>

      {isNonEmpty && (
        <SpoilerButton onClick={handleClick}>{t("readMore")}</SpoilerButton>
      )}
    </>
  );
};

Spoiler.propTypes = {
  children: PropTypes.node.isRequired,
  maxLineClamp: PropTypes.number.isRequired,
};
