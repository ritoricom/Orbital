import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { assertNotNullable } from "@/utils/assert";
import { isNonNullable } from "@/utils/eq";
import { fromEmptyStringToOptional } from "@/utils/from";
import { useLeisure } from "../hooks/use-leisure";
import { useUpdateLeisure } from "../hooks/use-update-leisure";
import { LeisureForm, LeisureFormValues } from "../ui/LeisureForm";

export const EditLeisure: FC = () => {
  const navigate = useNavigate();
  const { leisureID } = useParams();
  assertNotNullable(leisureID);

  const { isFetching, data: leisure } = useLeisure({
    leisureID,
  });

  const { mutateAsync: updateLeisure } = useUpdateLeisure({
    mutationConfig: {
      onSuccess: () => {
        navigate("/leisures");
      },
    },
  });

  const handleCancel = () => {
    navigate("/leisures");
  };

  const handleSubmit = async (values: LeisureFormValues) => {
    await updateLeisure({
      ...values,
      leisureID,
      note: fromEmptyStringToOptional(values.note),
      route: fromEmptyStringToOptional(values.route),
      phone: fromEmptyStringToOptional(values.phone),
      email: fromEmptyStringToOptional(values.email),
      days: values.days.map((day) => ({
        ...day,
        timeAndPlace: fromEmptyStringToOptional(day.timeAndPlace),
        duration: fromEmptyStringToOptional(day.duration),
        host: fromEmptyStringToOptional(day.host),
      })),
    });
  };

  return (
    <>
      <SEO title="Редактировать досуг" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Редактировать досуг
        </Typography>
        {!isFetching && isNonNullable(leisure) && (
          <LeisureForm
            submitLabel="сохранить изменения"
            initialValues={leisure}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </PagePaper>
    </>
  );
};
