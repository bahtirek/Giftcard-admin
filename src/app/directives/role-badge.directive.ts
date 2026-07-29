import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appRoleBadge]',
  standalone: true,
  host: {
    '[class.badge--danger]': 'currentRole() === "Admin"',
    '[class.badge--success]': 'currentRole() === "Sales Person"',
    '[class.badge--info]': 'currentRole() === "User"'
  }
})
export class RoleBadgeDirective {
  currentRole = input.required<string>({ alias: 'appRoleBadge' });
}
