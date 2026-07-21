import { Component } from '@angular/core';
import { ProfileForm } from "./profile-form/profile-form";
import { PasswordForm } from "./password-form/password-form";

@Component({
  selector: 'app-update-profile',
  imports: [ProfileForm, PasswordForm],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.scss',
})
export class UpdateProfile {
  onSaveButtonClick(){

  }

  onCancel() {

  }
}
