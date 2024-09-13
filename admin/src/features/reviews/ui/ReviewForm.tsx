import { FC } from "react";
import { useForm } from "react-hook-form";
import { InferType, object, string, number, mixed, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { RichTextEditorField } from "@/lib/rte";
import { DatePickerField, TextField, Select, RatingField } from "@/ui/inputs";
import { MaybePromise } from "@/types/utility";
import { getValuesFromSelect } from "@/utils/select";
import { getOr, getOrElse, getOrEmptyString } from "@/utils/fp";
import { getCurrentDateWithoutTime } from "@/utils/date";
import { City, cityOptions, useCityByUser } from "@/features/misc";
import { Review } from "../types/review";

const schema = object({
  headers: object({
    ru: string().required("Обязательное поле"),
    en: string().required("Обязательное поле"),
  }),
  descriptions: object({
    ru: string().required("Обязательное поле"),
    en: string().required("Обязательное поле"),
  }),
  authors: object({
    ru: string().required("Обязательное поле"),
    en: string().required("Обязательное поле"),
  }),
  city: mixed<City>()
    .oneOf(getValuesFromSelect(cityOptions), "Выберите город")
    .required("Обязательное поле"),
  publishedAt: date()
    .typeError("Некорректная дата")
    .required("Обязательное поле"),
  grade: number().required("Обязательное поле"),
});

export type ReviewFormValues = InferType<typeof schema>;

export interface ReviewFormProps {
  initialValues?: Partial<Review>;
  submitLabel: string;
  onSubmit?: (values: ReviewFormValues) => MaybePromise<void>;
  onCancel?: () => void;
}

export const ReviewForm: FC<ReviewFormProps> = ({
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
  } = useForm<ReviewFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      headers: {
        ru: getOrEmptyString(initialValues?.headers?.ru),
        en: getOrEmptyString(initialValues?.headers?.en),
      },
      descriptions: {
        ru: getOrEmptyString(initialValues?.descriptions?.ru),
        en: getOrEmptyString(initialValues?.descriptions?.en),
      },
      authors: {
        ru: getOrEmptyString(initialValues?.authors?.ru),
        en: getOrEmptyString(initialValues?.authors?.en),
      },
      city: getOr(initialCity)(initialValues?.city),
      publishedAt: getOrElse(() => getCurrentDateWithoutTime())(
        initialValues?.publishedAt
      ),
      grade: getOr(4)(initialValues?.grade),
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
        <Grid item xs={6}>
          <TextField label="Заголовок" name="headers.ru" control={control} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Имя" name="authors.ru" control={control} />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorField
            label="Описание"
            name="descriptions.ru"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "40px" }}>
          <Typography variant="caption">Английская версия</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Заголовок" name="headers.en" control={control} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Имя" name="authors.en" control={control} />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorField
            label="Описание"
            name="descriptions.en"
            control={control}
          />
        </Grid>
        <Grid container item columnSpacing={3} sx={{ marginTop: "40px" }}>
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
            <DatePickerField
              label="Дата публикации"
              name="publishedAt"
              control={control}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <RatingField label="Оценка" name="grade" control={control} />
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
