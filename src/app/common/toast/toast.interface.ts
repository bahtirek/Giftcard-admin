export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  /** ms before auto-dismiss; 0 or negative disables auto-dismiss */
  duration: number;
}
