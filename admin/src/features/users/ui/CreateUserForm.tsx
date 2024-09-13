import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InferType, lazy, mixed, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { MaybePromise, OrEmptyString } from "@/types/utility";
import { PasswordField, Select, TextField } from "@/ui/inputs";
import { getValuesFromSelect } from "@/utils/select";
import { cityOptions, City } from "@/features/misc";
import { roleOptions, UserRole } from "@/features/users";

const schema = object({
  fullName: string().required("Обязательное поле"),
  email: string().required("Обязательное поле").email("Некорректный E-mail"),
  password: string().required("Обязательное поле"),
  role: mixed<UserRole>()
    .oneOf(getValuesFromSelect(roleOptions), "Выберите роль")
    .required(),
  city: lazy((_, ctx) =>
    ctx.parent.role === "manager"
      ? mixed<City>()
          .oneOf(getValuesFromSelect(cityOptions), "Выберите город")
          .required()
      : mixed<OrEmptyString<City>>().oneOf([""]).required()
  ),
});

export type CreateUserFormValues = InferType<typeof schema>;

export interface UserFormProps {
  onSubmit?: (values: CreateUserFormValues) => MaybePromise<void>;
  onCancel?: () => void;
}

export const CreateUserForm: FC<UserFormProps> = ({ onSubmit, onCancel }) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit: withSubmit,
    formState: { isSubmitting },
  } = useForm<CreateUserFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "" as UserRole,
      city: "",
    },
  });

  const watchRole = watch("role");

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (name === "role" && values.role === "admin") {
        setValue("city", "");
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

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
          <TextField label="ФИО" name="fullName" control={control} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="E-mail" name="email" control={control} />
        </Grid>
        <Grid item xs={6}>
          <PasswordField label="Пароль" name="password" control={control} />
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Роль"
            name="role"
            control={control}
            options={roleOptions}
          />
        </Grid>
        {watchRole === "manager" && (
          <Grid item xs={6}>
            <Select
              label="Город"
              name="city"
              control={control}
              options={cityOptions}
            />
          </Grid>
        )}
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
          Добавить
        </LoadingButton>
      </Box>
    </Box>
  );
};
