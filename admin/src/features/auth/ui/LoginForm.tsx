import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

import { useAuthentication } from "@/lib/authentication";
import { TextField } from "@/ui/inputs/TextField";
import { PasswordField } from "@/ui/inputs/PasswordField";

const schema = z.object({
  email: z
    .string()
    .min(1, "Обязательное поле")
    .email({ message: "Некорректный E-mail" }),
  password: z.string().min(1, "Обязательное поле"),
});

type LoginValues = z.infer<typeof schema>;

export interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuthentication();

  const { control, handleSubmit: withSubmit } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: login,
    onSuccess,
  });

  const handleSubmit = withSubmit((values) => {
    mutate(values);
  });

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="E-mail" name="email" control={control} />
      <PasswordField label="Пароль" name="password" control={control} />
      <LoadingButton
        fullWidth
        loading={isLoading}
        type="submit"
        variant="contained"
        size="medium"
        sx={{
          marginTop: "30px",
          maxWidth: 327,
        }}
      >
        Войти
      </LoadingButton>
    </Box>
  );
};
