import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { getReview } from "../api/get-review";
import { Review } from "../types/review";

export interface UseReviewOptions {
  reviewID: string;
  queryConfig?: QueryConfig<Review>;
}

export const useReview = (options: UseReviewOptions): UseQueryReturn<Review> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "review",
      {
        reviewID: options.reviewID,
      },
    ],
    queryFn: () =>
      getReview({
        reviewID: options.reviewID,
      }),
  });
