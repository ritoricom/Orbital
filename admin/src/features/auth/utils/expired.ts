import { Token } from "../types/token";

export const isExpiredToken = (token: Token): boolean => {
  const expired = new Date(token.expired * 1000);

  return expired.getTime() < Date.now();
};
