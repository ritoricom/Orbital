import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";

import { Newsletter } from "../types/newsletter";
import { getNewsletter } from "../api/get-newsletter";

export interface UseNewsletterOptions {
  newsletterID: string;
  queryConfig?: QueryConfig<Newsletter>;
}

export const useNewsletter = (
  options: UseNewsletterOptions
): UseQueryReturn<Newsletter> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "newsletter",
      {
        newsletterID: options.newsletterID,
      },
    ],
    queryFn: () =>
      getNewsletter({
        newsletterID: options.newsletterID,
      }),
  });
