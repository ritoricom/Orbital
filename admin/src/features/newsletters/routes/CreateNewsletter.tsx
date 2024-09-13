import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { useCreateNewsletter } from "../hooks/use-create-newsletter";
import { NewsletterForm, NewsletterFormValues } from "../ui/NewsletterForm";

export const CreateNewsletter: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: createNewsletter } = useCreateNewsletter({
    mutationConfig: {
      onSuccess: () => {
        navigate("/newsletters");
      },
    },
  });

  const handleSubmit = async (values: NewsletterFormValues) => {
    await createNewsletter(values);
  };

  const handleCancel = () => {
    navigate("/newsletters");
  };

  return (
    <>
      <SEO title="Добавить рассылку" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4">Добавить рассылку</Typography>
        <NewsletterForm
          submitLabel="Добавить"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </PagePaper>
    </>
  );
};
