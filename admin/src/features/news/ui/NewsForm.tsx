import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { array, date, InferType, mixed, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { RichTextEditorField } from "@/lib/rte";
import { AddImageIcon, UploadIcon } from "@/ui/icons";
import { DatePickerField, Select, TextField } from "@/ui/inputs";
import { MaybePromise } from "@/types/utility";
import { getOr, getOrElse, getOrEmptyString } from "@/utils/fp";
import { getValuesFromSelect } from "@/utils/select";
import { getCurrentDateWithoutTime } from "@/utils/date";
import { isNonEmptyArray, isNonNullable } from "@/utils/eq";
import { HelperText } from "@/features/misc/ui/HelperText";
import { UploadImageButton } from "@/features/images/ui/UploadImageButton";
import { ImageCard } from "@/features/images/ui/ImageCard";
import { Image } from "@/features/images";
import { useNewsCityByUser } from "../hooks/use-news-city-by-user";
import { newsCityOptions } from "../config/options";
import { News } from "../types/news";
import { NewsCity } from "../types/news-city";

const schema = object({
  titles: object({
    ru: string().required("Обязательное поле"),
    en: string().required("Обязательное поле"),
  }),
  descriptions: object({
    ru: string().required("Обязательное поле"),
    en: string().required("Обязательное поле"),
  }),
  city: mixed<NewsCity>()
    .oneOf(getValuesFromSelect(newsCityOptions), "Выберите город")
    .required("Обязательное поле"),
  publishedAt: date()
    .typeError("Некорректная дата")
    .required("Обязательное поле"),
  cover: object({
    id: string().required(),
    url: string().required(),
  })
    .default(undefined)
    .required("Загрузите изображение для обложки"),
  images: array()
    .of(
      object({
        id: string().required(),
        url: string().required(),
      })
    )
    .min(1, "Загрузите минимум одно изображение для фотографий")
    .required(),
});

export type NewsFormValues = InferType<typeof schema>;

export interface NewsFormProps {
  initialValues?: Partial<News>;
  submitLabel: string;
  onSubmit?: (values: NewsFormValues) => MaybePromise<void>;
  onCancel?: () => void;
}

export const NewsForm: FC<NewsFormProps> = ({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}) => {
  const { city: initialCity, accessToOtherCities } = useNewsCityByUser();

  const {
    control,
    handleSubmit: withSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<NewsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      titles: {
        ru: getOrEmptyString(initialValues?.titles?.ru),
        en: getOrEmptyString(initialValues?.titles?.en),
      },
      descriptions: {
        ru: getOrEmptyString(initialValues?.descriptions?.ru),
        en: getOrEmptyString(initialValues?.descriptions?.en),
      },
      city: getOr(initialCity)(initialValues?.city) as NewsCity,
      publishedAt: getOrElse(() => getCurrentDateWithoutTime())(
        initialValues?.publishedAt
      ),
      cover: initialValues?.cover,
      images: getOr([] as Image[])(initialValues?.images),
    },
  });

  const {
    fields: images,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const watchCover = watch("cover");

  const handleSuccessUploadCover = (image: Image) => {
    setValue("cover", image, { shouldValidate: true });
  };

  const handleDeleteCover = () => {
    setValue("cover", undefined, { shouldValidate: true });
  };

  const handleSuccessUploadImage = (image: Image) => {
    appendImage(image);
  };

  const handleDeleteImage = (idx: number) => {
    removeImage(idx);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleSubmit = withSubmit(async (values) => {
    await onSubmit?.(values);
  });

  const helperTextVariant =
    isNonNullable(errors.cover) || isNonNullable(errors.images)
      ? "error"
      : "warning";

  const helperText =
    isNonNullable(errors.cover) || isNonNullable(errors.images)
      ? (errors.cover?.message as string) || (errors.images?.message as string)
      : "Обложка и фотографии обязательны";

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12}>
          <Typography variant="caption">Русская версия</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Заголовок" name="titles.ru" control={control} />
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
        <Grid item xs={12}>
          <TextField label="Заголовок" name="titles.en" control={control} />
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
              options={newsCityOptions}
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
        <Grid
          container
          item
          xs={12}
          columnSpacing={2}
          sx={{ marginTop: "40px" }}
        >
          <Grid item>
            <UploadImageButton
              resolution="687x339"
              icon={<UploadIcon />}
              onSuccess={handleSuccessUploadCover}
            >
              загрузить обложку
            </UploadImageButton>
          </Grid>
          <Grid item>
            <UploadImageButton
              resolution="567x525"
              icon={<AddImageIcon />}
              onSuccess={handleSuccessUploadImage}
            >
              загрузить фотографии
            </UploadImageButton>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          columnSpacing={3}
          sx={{ marginTop: "16px" }}
        >
          <Grid item xs={6}>
            {isNonNullable(watchCover) && (
              <>
                <Typography variant="caption">Обложка</Typography>
                <Box sx={{ height: "450px", marginTop: "6px" }}>
                  <ImageCard image={watchCover} onDelete={handleDeleteCover} />
                </Box>
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            {isNonEmptyArray(images) && (
              <>
                <Typography variant="caption">Фотографии</Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridAutoRows: "233px",
                    columnGap: "16px",
                    rowGap: "3px",
                    marginTop: "6px",
                  }}
                >
                  {images.map((image, idx) => (
                    <ImageCard
                      key={image.id}
                      image={image}
                      onDelete={() => handleDeleteImage(idx)}
                    />
                  ))}
                </Box>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <HelperText variant={helperTextVariant}>{helperText}</HelperText>
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
