import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBadgeDirective } from '../../../directives/status-badge.directive';
import { ProfileService } from '../profile-service';
import { Profile } from '../settings.interface';

@Component({
  selector: 'app-users',
  imports: [StatusBadgeDirective],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})

export class Users {
  ngOnInit(): void {
    this.profileService.getAllProfiles();
  }

  router = inject(Router);
  profileService = inject(ProfileService);

  users = this.profileService.profiles;

  openUserDetails(user: Profile){
    const userData = JSON.stringify(user)
    this.router.navigate(['/dashboard/user-details', userData ])
  }
}
