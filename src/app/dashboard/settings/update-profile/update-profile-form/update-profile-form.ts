import { Component, input } from '@angular/core';
import { UserForm } from "../../users/user-form/user-form";
import { User } from '../../settings.interface';

@Component({
  selector: 'app-update-profile-form',
  imports: [UserForm],
  templateUrl: './update-profile-form.html',
  styleUrl: './update-profile-form.scss',
})
export class UpdateProfileForm {
  user = input<User>()

  onSaveButtonClick(){

  }

  onCancel(){

  }
}
