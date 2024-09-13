import { getTokenFromStorage } from "@/features/auth";
import { isNonNullable } from "@/utils/eq";

export type Headers = Record<string, string>;

export const getBearerAuthHeader = (): Headers => {
  const token = getTokenFromStorage();
  if (isNonNullable(token)) {
    return {
      Authorization: `Bearer ${token.token}`,
    };
  } else {
    throw new Error("token is missing in the store");
  }
};
