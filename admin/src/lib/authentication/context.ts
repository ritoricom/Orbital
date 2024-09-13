import { createContext } from "react";

import { Nullable } from "@/types/utility";
import { User } from "@/features/users";
import { LoginPayload } from "@/features/auth";
import { AuthenticationStatus } from "./reducer";

export interface AuthenticationContextResult {
  status: AuthenticationStatus;
  user: Nullable<User>;
  isUnknown: boolean;
  isAuthenticated: boolean;
  isUnauthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

export const AuthenticationContext =
  createContext<Nullable<AuthenticationContextResult>>(null);

AuthenticationContext.displayName = "Authentication";
