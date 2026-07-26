import { Component } from '@angular/core';
import { PasswordForm } from "./password-form/password-form";
import { UserForm } from '../users/user-form/user-form';

@Component({
  selector: 'app-update-profile',
  imports: [PasswordForm, UserForm],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.scss',
})
export class UpdateProfile {
  onSaveButtonClick(){

  }

  onCancel() {

  }
}
