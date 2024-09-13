import { Nullable } from "@/types/utility";
import { isNonNullable } from "@/utils/eq";
import { Token } from "@/features/auth";

const TOKEN_KEY = "auth-token";

export const getTokenFromStorage = (): Nullable<Token> => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!isNonNullable(token)) {
    return null;
  }

  return JSON.parse(token);
};

export const setTokenInStorage = (token: Token) => {
  const stringifyToken = JSON.stringify(token);

  localStorage.setItem(TOKEN_KEY, stringifyToken);
};

export const removeTokenInStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};
