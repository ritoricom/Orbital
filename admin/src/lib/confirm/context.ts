import { createContext } from "react";

import { Nullable } from "@/types/utility";
import { ConfirmOptions } from "./types";

export type ConfirmFn = (options: ConfirmOptions) => void;

export const ConfirmContext = createContext<Nullable<ConfirmFn>>(null);

ConfirmContext.displayName = "Confirm";
