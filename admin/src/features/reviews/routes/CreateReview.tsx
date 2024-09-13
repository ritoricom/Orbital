import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { useCreateReview } from "../hooks/use-create-review";
import { ReviewFormValues, ReviewForm } from "../ui/ReviewForm";

export const CreateReview: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: createReview } = useCreateReview({
    mutationConfig: {
      onSuccess: () => {
        navigate("/reviews");
      },
    },
  });

  const handleCancel = () => {
    navigate("/reviews");
  };

  const handleSubmit = async (values: ReviewFormValues) => {
    await createReview(values);
  };

  return (
    <>
      <SEO title="Добавить отзыв" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Добавить отзыв
        </Typography>
        <ReviewForm
          submitLabel="добавить"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </PagePaper>
    </>
  );
};
