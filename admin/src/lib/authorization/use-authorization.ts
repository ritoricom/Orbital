import { useAuthentication } from "@/lib/authentication";
import { isNonNullable } from "@/utils/eq";
import {
  CheckAccessOptions,
  checkAccess as checkAccessUtil,
} from "@/features/auth";

export interface UseAuthorizationReturn {
  checkAccess: (options: CheckAccessOptions) => boolean;
}

export const useAuthorization = (): UseAuthorizationReturn => {
  const { user } = useAuthentication();

  const checkAccess = (options: CheckAccessOptions): boolean => {
    if (!isNonNullable(user)) {
      return false;
    }

    return checkAccessUtil(user, options);
  };

  return { checkAccess };
};
