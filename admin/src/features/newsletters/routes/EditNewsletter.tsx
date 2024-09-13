import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { isNonNullable } from "@/utils/eq";
import { assertNotNullable } from "@/utils/assert";
import { useNewsletter } from "../hooks/use-newsletter";
import { useUpdateNewsletter } from "../hooks/use-update-newsletter";
import { NewsletterForm, NewsletterFormValues } from "../ui/NewsletterForm";

export const EditNewsletter: FC = () => {
  const navigate = useNavigate();
  const { newsletterID } = useParams();
  assertNotNullable(newsletterID);

  const { isFetching, data: newsletter } = useNewsletter({
    newsletterID,
  });

  const { mutateAsync: updateNewsletter } = useUpdateNewsletter({
    mutationConfig: {
      onSuccess: () => {
        navigate("/newsletters");
      },
    },
  });

  const handleSubmit = async (values: NewsletterFormValues) => {
    await updateNewsletter({
      newsletterID,
      ...values,
    });
  };

  const handleCancel = () => {
    navigate("/newsletters");
  };

  return (
    <>
      <SEO title="Редактировать рассылку" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4">Редактировать рассылку</Typography>
        {!isFetching && isNonNullable(newsletter) && (
          <NewsletterForm
            submitLabel="сохранить изменения"
            initialValues={newsletter}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </PagePaper>
    </>
  );
};
