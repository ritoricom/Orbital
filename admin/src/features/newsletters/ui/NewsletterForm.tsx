import { FC } from "react";
import { useForm } from "react-hook-form";
import { InferType, mixed, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { MaybePromise } from "@/types/utility";
import { Select, TextField } from "@/ui/inputs";
import { getOr, getOrEmptyString } from "@/utils/fp";
import { getValuesFromSelect } from "@/utils/select";
import { cityOptions, City, useCityByUser } from "@/features/misc";
import { Newsletter } from "../types/newsletter";

const schema = object({
  email: string().required("Обязательное поле").email("Некорректный E-mail"),
  city: mixed<City>()
    .oneOf(getValuesFromSelect(cityOptions), "Выберите город")
    .required(),
});

export type NewsletterFormValues = InferType<typeof schema>;

export interface NewsletterFormProps {
  initialValues?: Partial<Newsletter>;
  submitLabel: string;
  onSubmit?: (values: NewsletterFormValues) => MaybePromise<void>;
  onCancel?: () => void;
}

export const NewsletterForm: FC<NewsletterFormProps> = ({
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
  } = useForm<NewsletterFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: getOrEmptyString(initialValues?.email),
      city: getOr(initialCity)(initialValues?.city) as City,
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
        <Grid item xs={6}>
          <TextField label="E-mail" name="email" control={control} />
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
