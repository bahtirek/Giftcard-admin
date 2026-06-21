import { Service, signal, computed } from '@angular/core';

@Service()
export class LoaderService {
  // Track multiple concurrent requests
  private _loadingCount = signal(0);

  // Public computed: true only when at least one operation is pending
  readonly isLoading = computed(() => this._loadingCount() > 0);

  show(): void {
    this._loadingCount.update(n => n + 1);
  }

  hide(): void {
    this._loadingCount.update(n => Math.max(0, n - 1));
  }
}
