import { InternalServerError } from "@/errors/internal-server-error";
import { NotFoundError } from "@/errors/not-found-error";

export const checkSuccess = (res) => {
  if (res.ok) {
    return res;
  }
  switch (res.status) {
    case 404:
      throw new NotFoundError();
    case 500:
    default:
      throw new InternalServerError();
  }
};
