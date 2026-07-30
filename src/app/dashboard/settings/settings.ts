import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Profile } from './profile/profile';
import { Users } from "./users/users";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'settings',
  imports: [Profile, Users],
  templateUrl: './settings.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './settings.scss',
})
export class Settings {
  router = inject(Router);
  authService = inject(AuthService);
  user = this.authService.loggedUser

  onAddUserButtonClicked(){
    this.router.navigate(['/dashboard/add-user'])
  }
}
