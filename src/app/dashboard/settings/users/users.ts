import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBadgeDirective } from '../../../directives/status-badge.directive';
import { UserService } from '../users.service';
import { User } from '../settings.interface';

@Component({
  selector: 'app-users',
  imports: [StatusBadgeDirective],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})

export class Users {
  ngOnInit(): void {
    this.userService.getAllUsers();
  }

  user = input<User>()
  router = inject(Router);
  userService = inject(UserService);

  users = this.userService.users;

  openUserDetails(user: User){
    const userData = JSON.stringify(user)
    this.router.navigate(['/dashboard/user-details', userData ])
  }
}
