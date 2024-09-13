import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { SuccessModal, callMeBack } from "@/features/misc";
import { Button, Field, TextInput } from "@/ui/inputs";
import { useYup } from "@/lib/yup";
import { useCity } from "@/features/cities";

import styles from "./CallMeBackForm.module.css";

export const CallMeBackForm = () => {
  const { t } = useTranslation("misc", {
    keyPrefix: "ui.callMeBackForm",
  });
  const yup = useYup();
  const { city } = useCity();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().min(2).max(128).required(),
    phone: yup
      .string()
      .min(2)
      .max(16)
      .matches(/^(\+)?[0-9\s]{0,16}$/)
      .required(),
  });

  const {
    formState: { errors, isSubmitting },
    register,
    reset,
    handleSubmit: withSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmit = withSubmit(async (payload) => {
    await callMeBack({ city: city, ...payload });
    setOpenSuccessModal(true);
    reset();
  });

  const handleCloseSuccess = () => {
    setOpenSuccessModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field label={t("nameField.label")} error={errors.name?.message}>
          <TextInput
            {...register("name")}
            fullWidth
            className={styles.callMeBackFormField}
            type="text"
            error={errors.name?.message}
            placeholder={t("nameField.placeholder")}
          />
        </Field>
        <Field label={t("phoneField.label")} error={errors.phone?.message}>
          <TextInput
            {...register("phone")}
            fullWidth
            className={styles.callMeBackFormField}
            type="text"
            error={errors.phone?.message}
            placeholder="+"
          />
        </Field>
        <div className={styles.callMeBackFormBtnWrapper}>
          <Button
            fullWidth
            uppercase
            type="submit"
            loading={isSubmitting}
            className={styles.callMeBackFormBtn}
          >
            {t("send")}
          </Button>
        </div>
      </form>
      <SuccessModal open={openSuccessModal} root onClose={handleCloseSuccess} />
    </>
  );
};
