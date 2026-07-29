import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { RoleBadgeDirective } from '../../../directives/role-badge.directive';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'header',
  imports: [RoleBadgeDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'navbar',
  },
})
export class Header {
  protected location = inject(Location);
  private router = inject(Router)
  authService = inject(AuthService)
  user = this.authService.loggedUser

  protected back() {
    this.location.back();
  }

  logout(){
    this.authService.logout();
  }
  goToSettings(){
    this.router.navigate(['dashboard/settings'])
  }
}
