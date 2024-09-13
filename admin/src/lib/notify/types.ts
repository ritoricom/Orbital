export type NotifyKind = "success" | "error";

export interface NotifyOptions {
  kind: NotifyKind;
  title: string;
  desc?: string;
}
