import { Nullable } from "@/types/utility";
import { User } from "@/features/users";

export type AuthenticationStatus =
  | "unknown"
  | "authenticated"
  | "unauthenticated";

export interface AuthenticationState {
  status: AuthenticationStatus;
  user: Nullable<User>;
}

interface AuthenticateAction {
  type: "authenticate";
  payload: User;
}

interface UnauthenticateAction {
  type: "unauthenticate";
}

export type AuthAction = AuthenticateAction | UnauthenticateAction;

export const initialAuthState: AuthenticationState = {
  status: "unknown",
  user: null,
};

export const authenticationReducer = (
  state: AuthenticationState,
  action: AuthAction
): AuthenticationState => {
  switch (action.type) {
    case "authenticate":
      return {
        status: "authenticated",
        user: action.payload,
      };
    case "unauthenticate":
      return {
        status: "unauthenticated",
        user: null,
      };
    default:
      return state;
  }
};
