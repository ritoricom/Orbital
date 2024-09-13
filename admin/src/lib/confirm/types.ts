export interface ConfirmLabels {
  confirm?: string;
  cancel?: string;
}

export interface ConfirmOptions {
  title: string;
  subtitle?: string;
  labels?: ConfirmLabels;
  onCancel?: () => Promise<void> | void;
  onConfirm?: () => Promise<void> | void;
}
