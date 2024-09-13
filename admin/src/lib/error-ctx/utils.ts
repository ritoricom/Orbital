import { assert } from "@/utils/assert";
import { ContextError } from "./ContextError";

export const throwErrorCtx =
  (ctx: string) =>
  (err: unknown): never => {
    assert(err instanceof Error);

    throw new ContextError(ctx, err);
  };
