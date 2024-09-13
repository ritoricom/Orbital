import * as yup from "yup";
import { useTranslation } from "next-i18next";

export const useYup = () => {
  const { t } = useTranslation("common", {
    keyPrefix: "lib.yup.useYup",
  });

  // TODO: Add "useEffect"
  yup.setLocale({
    mixed: {
      default: t("mixed.fieldInvalid"),
      required: t("mixed.required"),
    },
    string: {
      min: ({ min }) => t("string.min", { value: min }),
      max: ({ max }) => t("string.max", { value: max }),
      matches: t("string.mathes"),
    },
  });

  return yup;
};
