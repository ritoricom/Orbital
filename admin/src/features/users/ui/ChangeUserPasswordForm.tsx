import { FC } from "react";
import { useForm } from "react-hook-form";
import { InferType, object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { MaybePromise } from "@/types/utility";
import { PasswordField } from "@/ui/inputs";

const schema = object({
  password: string().required("Обязательное поле"),
  confirmPassword: string()
    .oneOf([ref("password")], "Пароли не совпадают")
    .required("Обязательное поле"),
});

export type ChangeUserPasswordFormValues = InferType<typeof schema>;

export interface ChangeUserPasswordFormProps {
  onSubmit?: (values: ChangeUserPasswordFormValues) => MaybePromise<void>;
  onCancel?: () => void;
}

export const ChangeUserPasswordForm: FC<ChangeUserPasswordFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit: withSubmit,
    formState: { isSubmitting },
  } = useForm<ChangeUserPasswordFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
          <PasswordField
            label="Новый пароль"
            name="password"
            control={control}
          />
        </Grid>
        <Grid item xs={6}>
          <PasswordField
            label="Подтвердите пароль"
            name="confirmPassword"
            control={control}
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
          сохранить изменения
        </LoadingButton>
      </Box>
    </Box>
  );
};
