import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { assertNotNullable } from "@/utils/assert";
import { useChangeUserPassword } from "../hooks/use-change-user-password";
import {
  ChangeUserPasswordFormValues,
  ChangeUserPasswordForm,
} from "../ui/ChangeUserPasswordForm";

export const ChangeUserPassword: FC = () => {
  const { userID } = useParams();
  assertNotNullable(userID);

  const navigate = useNavigate();

  const { mutateAsync: createUser } = useChangeUserPassword({
    mutationConfig: {
      onSuccess: () => {
        navigate("/users");
      },
    },
  });

  const handleSubmit = async (values: ChangeUserPasswordFormValues) => {
    await createUser({
      userID,
      password: values.password,
    });
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <>
      <SEO title="Добавить пользователя" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4">Изменить пароль пользователя</Typography>
        <ChangeUserPasswordForm
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </PagePaper>
    </>
  );
};
