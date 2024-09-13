import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { InferType, array, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { RichTextEditorField } from "@/lib/rte";
import { AddImageIcon, DeleteIcon, UploadIcon } from "@/ui/icons";
import { PhoneField, TextField } from "@/ui/inputs";
import { MaybePromise } from "@/types/utility";
import { getOr, getOrEmptyString, mapNullable } from "@/utils/fp";
import { isNonEmptyArray, isNonNullable } from "@/utils/eq";
import { toOptional } from "@/utils/to";
import { HelperText } from "@/features/misc/ui/HelperText";
import { AddButton } from "@/features/misc/ui/AddButton";
import { UploadImageButton } from "@/features/images/ui/UploadImageButton";
import { ImageCard } from "@/features/images/ui/ImageCard";
import { Image } from "@/features/images";
import { Leisure } from "../types/leisure";
import { LeisureDay } from "../types/leisure-day";

const schema = object({
  title: string().required("Обязательное поле"),
  description: string().required("Обязательное поле"),
  note: string(),
  route: string(),
  phone: string().test({
    name: "phone",
    test: (value: any) => value === "" || value.length >= 10,
    message: "Номер телефона должен иметь 10 цифр",
  }),
  email: string().email("Некорректный E-mail"),
  days: array()
    .of(
      object({
        title: string().required("Обязательное поле"),
        timeAndPlace: string(),
        duration: string(),
        host: string(),
        description: string().required("Обязательное поле"),
      })
    )
    .required(),
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

export type LeisureFormValues = InferType<typeof schema>;

export interface LeisureFormProps {
  initialValues?: Leisure;
  submitLabel: string;
  onSubmit?: (values: LeisureFormValues) => MaybePromise<void>;
  onCancel?: () => void;
}

export const LeisureForm: FC<LeisureFormProps> = ({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit: withSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<LeisureFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: getOrEmptyString(initialValues?.title),
      description: getOrEmptyString(initialValues?.description),
      note: getOrEmptyString(initialValues?.note),
      route: getOrEmptyString(initialValues?.route),
      phone: getOrEmptyString(initialValues?.phone),
      email: getOrEmptyString(initialValues?.email),
      days: toOptional(
        mapNullable<LeisureDay[], LeisureFormValues["days"]>((days) =>
          days.map((day) => ({
            title: day.title,
            timeAndPlace: toOptional(day.timeAndPlace),
            duration: toOptional(day.duration),
            host: toOptional(day.host),
            description: day.description,
          }))
        )(getOr([] as LeisureDay[])(initialValues?.days))
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

  const {
    fields: days,
    append: appendDay,
    remove: removeDay,
  } = useFieldArray({
    control,
    name: "days",
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

  const handleAddDay = () => {
    appendDay({
      title: "",
      timeAndPlace: "",
      duration: "",
      host: "",
      description: "",
    });
  };

  const handleDeleteDay = (idx: number) => {
    removeDay(idx);
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
          <TextField label="Заголовок" name="title" control={control} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Маршрут" name="route" control={control} />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "40px" }}>
          <Typography variant="caption">Расписание</Typography>
        </Grid>
        <Grid item xs={12} sx={{ gap: "10px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {days.map((day, idx) => (
              <Box key={day.id}>
                <Box
                  key={day.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="textBoldM">{`День ${
                    idx + 1
                  }`}</Typography>
                  <IconButton onClick={() => handleDeleteDay(idx)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Grid container columnSpacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      label="Название"
                      name={`days.${idx}.title`}
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Время отъезда"
                      name={`days.${idx}.timeAndPlace`}
                      control={control}
                    />
                  </Grid>
                </Grid>
                <Grid container columnSpacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      label="Продолжительность программы"
                      name={`days.${idx}.duration`}
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Кто проводит"
                      name={`days.${idx}.host`}
                      control={control}
                    />
                  </Grid>
                </Grid>
                <RichTextEditorField
                  label="Описание"
                  name={`days.${idx}.description`}
                  control={control}
                />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "40px" }}>
          <AddButton onClick={handleAddDay} />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "40px" }}>
          <RichTextEditorField
            label="Общее описание"
            name="description"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField multiline label="Заметка" name="note" control={control} />
        </Grid>
        <Grid container item columnSpacing={3}>
          <Grid item xs={6}>
            <PhoneField label="Номер телефона" name="phone" control={control} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="E-mail" name="email" control={control} />
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
              resolution="448x575"
              icon={<UploadIcon />}
              onSuccess={handleSuccessUploadCover}
            >
              загрузить обложку
            </UploadImageButton>
          </Grid>
          <Grid item>
            <UploadImageButton
              resolution="686x613"
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
