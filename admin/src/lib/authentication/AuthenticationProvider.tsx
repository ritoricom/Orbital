import { FC, ReactNode, useEffect, useReducer } from "react";

import { isNonNullable } from "@/utils/eq";
import {
  LoginPayload,
  login as loginApi,
  loadUser as loadUserApi,
  isExpiredToken,
  setTokenInStorage,
  getTokenFromStorage,
  removeTokenInStorage,
} from "@/features/auth";
import { authenticationReducer, initialAuthState } from "./reducer";
import { AuthenticationContext } from "./context";

export interface AuthenticationProviderProps {
  fallback: ReactNode;
  children: ReactNode;
}

export const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
  fallback,
  children,
}) => {
  const [state, dispatch] = useReducer(authenticationReducer, initialAuthState);

  const isUnknown = state.status === "unknown";
  const isAuthenticated = state.status === "authenticated";
  const isUnauthenticated = state.status === "unauthenticated";

  const loadUser = async () => {
    const token = getTokenFromStorage();
    if (!isNonNullable(token)) {
      dispatch({ type: "unauthenticate" });

      return;
    }

    const isExpired = isExpiredToken(token);
    if (isExpired) {
      removeTokenInStorage();

      dispatch({ type: "unauthenticate" });

      return;
    }

    try {
      const user = await loadUserApi();
      dispatch({ type: "authenticate", payload: user });
    } catch (err) {
      removeTokenInStorage();
      dispatch({ type: "unauthenticate" });
    }
  };

  const login = async (payload: LoginPayload) => {
    const token = await loginApi(payload);
    setTokenInStorage(token);

    const user = await loadUserApi();
    dispatch({ type: "authenticate", payload: user });
  };

  const logout = () => {
    removeTokenInStorage();

    dispatch({ type: "unauthenticate" });
  };

  useEffect(() => {
    loadUser();
  }, []);

  switch (true) {
    case isUnknown:
      return <>{fallback}</>;
    case isAuthenticated:
    case isUnauthenticated:
      return (
        <AuthenticationContext.Provider
          value={{
            status: state.status,
            user: state.user,
            isUnknown,
            isUnauthenticated,
            isAuthenticated,
            login,
            logout,
          }}
        >
          {children}
        </AuthenticationContext.Provider>
      );
    default:
      throw new Error(`unhandled status: ${state.status}`);
  }
};
