import { FC } from "react";

import { useAuthentication } from "@/lib/authentication";

import { Unauthenticated } from "./Unauthenticated";
import { Authenticated } from "./Authenticated";

export const Routes: FC = () => {
  const { isAuthenticated, isUnauthenticated, status } = useAuthentication();

  switch (true) {
    case isUnauthenticated:
      return <Unauthenticated />;
    case isAuthenticated:
      return <Authenticated />;
    default:
      throw new Error(`unhandled in routes status: ${status}`);
  }
};
