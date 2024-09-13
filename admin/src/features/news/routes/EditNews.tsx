import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { assertNotNullable } from "@/utils/assert";
import { isNonNullable } from "@/utils/eq";
import { useNewsArticle } from "../hooks/use-news-article";
import { useUpdateNews } from "../hooks/use-update-news";
import { NewsForm, NewsFormValues } from "../ui/NewsForm";

export const EditNews: FC = () => {
  const navigate = useNavigate();
  const { newsID } = useParams();
  assertNotNullable(newsID);

  const { isFetching, data: news } = useNewsArticle({
    newsID,
  });

  const { mutateAsync: updateNews } = useUpdateNews({
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
    await updateNews({
      ...values,
      newsID,
    });
  };

  return (
    <>
      <SEO title="Редактировать новость" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Редактировать новость
        </Typography>
        {!isFetching && isNonNullable(news) && (
          <NewsForm
            submitLabel="сохранить изменения"
            initialValues={news}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </PagePaper>
    </>
  );
};
