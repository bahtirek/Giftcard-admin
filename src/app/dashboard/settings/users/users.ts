import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBadgeDirective } from '../../../directives/status-badge.directive';

@Component({
  selector: 'app-users',
  imports: [StatusBadgeDirective],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  router = inject(Router)
  openUserDetails(id: string){
    this.router.navigate(['/dashboard/user-details', id])
  }
}
