import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { fromEmptyStringToOptional } from "@/utils/from";
import { useCreateUser } from "../hooks/use-create-user";
import { CreateUserForm, CreateUserFormValues } from "../ui/CreateUserForm";

export const CreateUser: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: createUser } = useCreateUser({
    mutationConfig: {
      onSuccess: () => {
        navigate("/users");
      },
    },
  });

  const handleSubmit = async (values: CreateUserFormValues) => {
    await createUser({
      ...values,
      city: fromEmptyStringToOptional(values.city),
    });
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <>
      <SEO title="Добавить пользователя" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4">Добавить пользователя</Typography>
        <CreateUserForm onCancel={handleCancel} onSubmit={handleSubmit} />
      </PagePaper>
    </>
  );
};
