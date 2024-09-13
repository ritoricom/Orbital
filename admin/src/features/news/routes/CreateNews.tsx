import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { useCreateNews } from "../hooks/use-create-news";
import { NewsForm, NewsFormValues } from "../ui/NewsForm";

export const CreateNews: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: createNews } = useCreateNews({
    mutationConfig: {
      onSuccess: () => {
        navigate("/news");
      },
    },
  });

  const handleCancel = () => {
    navigate("/news");
  };

  const handleSubmit = async (values: NewsFormValues) => {
    await createNews(values);
  };

  return (
    <>
      <SEO title="Добавить новость" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Добавить новость
        </Typography>
        <NewsForm
          submitLabel="добавить"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </PagePaper>
    </>
  );
};
