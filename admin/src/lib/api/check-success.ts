import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@/errors";

export class ApiUnrecognizedError extends Error {
  constructor() {
    super("Сервер ответил в неожидаемом формате");
    this.name = "ApiUnrecognizedError";
  }
}

interface ApiErrorInfo {
  statusCode: number;
  message: string;
}

export const checkSuccess = async (response: Response) => {
  if (response.ok) {
    return response;
  }

  const respText = await response.text();

  const maybeApiErrorInfo =
    respText !== "" ? (JSON.parse(respText) as ApiErrorInfo) : null;
  const maybeApiErrorMsg = maybeApiErrorInfo?.message;

  switch (response.status) {
    case 400:
      throw new BadRequestError(maybeApiErrorMsg);
    case 401:
      throw new UnauthorizedError(maybeApiErrorMsg);
    case 402:
      throw new UnauthorizedError(maybeApiErrorMsg);
    case 403:
      throw new ForbiddenError(maybeApiErrorMsg);
    case 404:
      throw new NotFoundError(maybeApiErrorMsg);
    case 500:
      throw new InternalServerError(maybeApiErrorMsg);
    default:
      throw new ApiUnrecognizedError();
  }
};
