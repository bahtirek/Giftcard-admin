import { Component } from '@angular/core';
import { UserForm } from "./user-form/user-form";
import { PasswordForm } from "./password-form/password-form";

@Component({
  selector: 'app-update-user',
  imports: [UserForm, PasswordForm],
  templateUrl: './update-user.html',
  styleUrl: './update-user.scss',
})
export class UpdateUser {
  onSaveButtonClick(){

  }

  onCancel() {

  }
}
