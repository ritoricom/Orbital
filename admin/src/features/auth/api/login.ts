import { API_URL } from "@/config/api";
import { checkSuccess } from "@/lib/api";
import { throwErrorCtx } from "@/lib/error-ctx";
import { fromTokenDto, Token } from "@/features/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = (payload: LoginPayload): Promise<Token> =>
  fetch(`${API_URL}/api/admin/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromTokenDto)
    .catch(throwErrorCtx("Произошла ошибка при входе"));
