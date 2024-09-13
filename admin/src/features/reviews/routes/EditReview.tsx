import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { SEO } from "@/lib/meta";
import { PagePaper } from "@/ui/layout";
import { assertNotNullable } from "@/utils/assert";
import { isNonNullable } from "@/utils/eq";
import { useReview } from "../hooks/use-review";
import { useUpdateReview } from "../hooks/use-update-review";
import { ReviewForm, ReviewFormValues } from "../ui/ReviewForm";

export const EditReview: FC = () => {
  const navigate = useNavigate();
  const { reviewID } = useParams();
  assertNotNullable(reviewID);

  const { isFetching, data: review } = useReview({
    reviewID,
  });

  const { mutateAsync: updateReview } = useUpdateReview({
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
    await updateReview({
      ...values,
      reviewID,
    });
  };

  return (
    <>
      <SEO title="Редактировать отзыв" />
      <PagePaper hasLimitWidth>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Редактировать отзыв
        </Typography>
        {!isFetching && isNonNullable(review) && (
          <ReviewForm
            submitLabel="сохранить изменения"
            initialValues={review}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </PagePaper>
    </>
  );
};
