import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { isNonNullable } from "@/utils/eq";
import { assertNotNullable } from "@/utils/assert";
import { fromEmptyStringToOptional } from "@/utils/from";
import { useUpdateUser } from "../hooks/use-update-user";
import { useUser } from "../hooks/use-user";
import { EditUserForm, EditUserFormValues } from "../ui/EditUserForm";

export const EditUser: FC = () => {
  const { userID } = useParams();
  assertNotNullable(userID);

  const navigate = useNavigate();

  const { isFetching, data: user } = useUser({
    userID,
  });

  const { mutateAsync: updateUser } = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        navigate("/users");
      },
    },
  });

  const handleSubmit = async (values: EditUserFormValues) => {
    await updateUser({
      ...values,
      userID,
      city: fromEmptyStringToOptional(values.city),
    });
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <>
      <SEO title="Редактировать пользователя" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4">Редактировать пользователя</Typography>
        {!isFetching && isNonNullable(user) && (
          <EditUserForm
            submitLabel="сохранить изменения"
            initialValues={user}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </PagePaper>
    </>
  );
};
