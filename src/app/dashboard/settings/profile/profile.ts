import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  router = inject(Router);
  authService = inject(AuthService)

  user = this.authService.loggedUser

  onGiftCardEditButtonClick(){
    this.router.navigate(['/dashboard/update-profile'])
  }
}
