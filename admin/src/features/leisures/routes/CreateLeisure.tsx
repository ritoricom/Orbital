import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { fromEmptyStringToOptional } from "@/utils/from";
import { useCreateLeisure } from "../hooks/use-create-leisure";
import { LeisureForm, LeisureFormValues } from "../ui/LeisureForm";

export const CreateLeisure: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: createLeisure } = useCreateLeisure({
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
    await createLeisure({
      ...values,
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
      <SEO title="Добавить досуг" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Добавить досуг
        </Typography>
        <LeisureForm
          submitLabel="добавить"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </PagePaper>
    </>
  );
};
