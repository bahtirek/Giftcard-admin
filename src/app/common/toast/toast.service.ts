import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from './toast.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;

  // Private writable signal — the source of truth.
  private readonly _toasts = signal<Toast[]>([]);

  // Public read-only signal — components consume this, nobody outside
  // the service can mutate it directly.
  readonly toasts = this._toasts.asReadonly();

  /**
   * Show a toast. Returns the generated id so callers can dismiss it
   * manually if they need to (e.g. on a related action completing early).
   */
  show(message: string, type: ToastType = 'info', duration = 3000): number {
    const id = this.nextId++;
    const toast: Toast = { id, message, type, duration };

    this._toasts.update(toasts => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }

    return id;
  }

  success(message: string, duration = 3000): number {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration = 4500): number {
    return this.show(message, 'error', duration);
  }

  info(message: string, duration = 3000): number {
    return this.show(message, 'info', duration);
  }

  warning(message: string, duration = 3500): number {
    return this.show(message, 'warning', duration);
  }

  dismiss(id: number): void {
    this._toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }
}
