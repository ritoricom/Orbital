import { ReactNode, Component } from "react";

import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@/errors";
import { isNonNullable } from "@/utils/eq";
import { NotFoundErrorDisplay } from "@/features/errors/ui/NotFoundErrorDisplay";
import { InternalClientErrorDisplay } from "@/features/errors/ui/InternalClientErrorDisplay";
import { UnauthorizedErrorDisplay } from "@/features/errors/ui/UnauthorizedErrorDisplay";
import { ForbiddenErrorDisplay } from "@/features/errors/ui/ForbiddenErrorDisplay";
import { InternalServerErrorDisplay } from "@/features/errors/ui/InternalServerErrorDisplay";

export interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  err: unknown;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { err: null };

  public static getDerivedStateFromError(error: unknown) {
    return { err: error };
  }

  public render() {
    switch (true) {
      case !isNonNullable(this.state.err):
        return this.props.children;

      case this.state.err instanceof UnauthorizedError:
        return <UnauthorizedErrorDisplay />;

      case this.state.err instanceof ForbiddenError:
        return <ForbiddenErrorDisplay />;

      case this.state.err instanceof NotFoundError:
        return <NotFoundErrorDisplay />;

      case this.state.err instanceof InternalServerError:
        return <InternalServerErrorDisplay />;

      default:
        return <InternalClientErrorDisplay />;
    }
  }
}
