import { Component, inject } from '@angular/core';
import { PasswordForm } from "./password-form/password-form";
import { UpdateProfileForm } from "./update-profile-form/update-profile-form";
import { User } from '../settings.interface';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-update-profile',
  imports: [PasswordForm, UpdateProfileForm],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.scss',
})
export class UpdateProfile {
  authService = inject(AuthService)
  user = this.authService.loggedUser

  onSaveButtonClick(){

  }

  onCancel() {

  }
}
