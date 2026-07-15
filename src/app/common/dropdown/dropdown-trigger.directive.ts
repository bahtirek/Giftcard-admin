import { Directive, HostListener, inject } from '@angular/core';
import { DROPDOWN_HOST } from './dropdown-host.token';

/**
 * Apply this to any element projected into <app-dropdown> to make it act
 * as the trigger, instead of the component's built-in button.
 *
 * <app-dropdown [options]="opts" [(open)]="isOpen">
 *   <button appDropdownTrigger>My custom trigger</button>
 * </app-dropdown>
 */
@Directive({
  selector: '[appDropdownTrigger]',
  standalone: true,
  host: {
    '[attr.aria-haspopup]': "'listbox'",
    '[attr.aria-expanded]': 'dropdown.open()',
  },
})
export class DropdownTriggerDirective {
  protected readonly dropdown = inject(DROPDOWN_HOST);

  @HostListener('click')
  onClick(): void {
    this.dropdown.toggleDropdown();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    this.dropdown.handleTriggerKeydown(event);
  }
}
