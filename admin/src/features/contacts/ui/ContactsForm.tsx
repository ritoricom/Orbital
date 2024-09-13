import { FC } from "react";
import { useForm } from "react-hook-form";
import { InferType, string, number, object, array, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { MapField, PhoneField, Select, TextField } from "@/ui/inputs";
import { MaybePromise } from "@/types/utility";
import { getValuesFromSelect } from "@/utils/select";
import { getOr, getOrEmptyString } from "@/utils/fp";
import { City, cityOptions, useCityByUser } from "@/features/misc";
import { Contacts } from "../types/contacts";

const schema = object({
  addresses: object({
    ru: string().required("Обязательное поле"),
    en: string().required("Обязательное поле"),
  }),
  city: mixed<City>()
    .oneOf(getValuesFromSelect(cityOptions), "Выберите город")
    .required(),
  email: string().email("Некорректный E-mail").required("Обязательное поле"),
  phone: string()
    .required("Обязательное поле")
    .length(10, "Номер телефона должен иметь 10 цифр"),
  location: array()
    .of(number().required("Обязательное"))
    .length(2)
    .required("Обязательное поле"),
  vkLink: string().url("Некорректная ссылка").required("Обязательное поле"),
});

export type ContactsFormValues = InferType<typeof schema>;

export interface ContactsFormProps {
  initialValues?: Partial<Contacts>;
  submitLabel: string;
  onSubmit?: (values: ContactsFormValues) => MaybePromise<void>;
  onCancel?: () => void;
}

export const ContactsForm: FC<ContactsFormProps> = ({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}) => {
  const { city: initialCity, accessToOtherCities } = useCityByUser();

  const {
    control,
    handleSubmit: withSubmit,
    formState: { isSubmitting },
  } = useForm<ContactsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      addresses: {
        ru: getOrEmptyString(initialValues?.addresses?.ru),
        en: getOrEmptyString(initialValues?.addresses?.en),
      },
      city: getOr(initialCity)(initialValues?.city),
      email: getOrEmptyString(initialValues?.email),
      phone: getOrEmptyString(initialValues?.phone),
      location: getOr([55, 30])(initialValues?.location),
      vkLink: getOrEmptyString(initialValues?.vkLink),
    },
  });

  const handleCancel = () => {
    onCancel?.();
  };

  const handleSubmit = withSubmit(async (values) => {
    await onSubmit?.(values);
  });

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12}>
          <Typography variant="caption">Русская версия</Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "32px " }}>
          <TextField label="Адрес" name="addresses.ru" control={control} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">Английская версия</Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "32px " }}>
          <TextField label="Адрес" name="addresses.en" control={control} />
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Город"
            name="city"
            disabled={!accessToOtherCities}
            control={control}
            options={cityOptions}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled
            label="Метка на карте"
            name="location"
            control={control}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="E-mail" name="email" control={control} />
        </Grid>
        <Grid item xs={6}>
          <PhoneField label="Номер телефона" name="phone" control={control} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Ссылка на ВКонтакте"
            name="vkLink"
            control={control}
          />
        </Grid>
        <Grid item xs={12} height={262}>
          <MapField name="location" control={control} />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={handleCancel}
        >
          Отменить
        </Button>
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          size="medium"
        >
          {submitLabel}
        </LoadingButton>
      </Box>
    </Box>
  );
};
