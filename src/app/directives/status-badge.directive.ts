import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appStatusBadge]',
  standalone: true,
  host: {
    '[class.badge--success]': 'currentStatus() === "Active"',
    '[class.badge--warning]': 'currentStatus() === "Pending"',
    '[class.badge--default]': 'currentStatus() === "Inactive"'
  }
})
export class StatusBadgeDirective {
  currentStatus = input.required<string>({ alias: 'appStatusBadge' });
}
