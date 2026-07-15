import { InjectionToken, WritableSignal } from '@angular/core';

/**
 * Minimal surface the trigger directive needs from its host DropdownComponent.
 * Routing through a token (instead of importing DropdownComponent directly)
 * avoids a circular import between the component and the directive.
 */
export interface DropdownHost {
  readonly open: WritableSignal<boolean>;
  toggleDropdown(): void;
  openDropdown(): void;
  closeDropdown(): void;
  handleTriggerKeydown(event: KeyboardEvent): void;
}

export const DROPDOWN_HOST = new InjectionToken<DropdownHost>('DROPDOWN_HOST');
