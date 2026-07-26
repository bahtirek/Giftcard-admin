import { Component, signal } from '@angular/core';
import { UserForm } from "../user-form/user-form";
import { initialUserData, UserModel } from '../../settings.interface';
import { User } from '../../user/user';

@Component({
  selector: 'app-update-user',
  imports: [UserForm],
  templateUrl: './update-user.html',
  styleUrl: './update-user.scss',
})
export class UpdateUser {

  //user = signal<User>({})

  onSubmitButtonClick(){

  }

  onUserSubmitEvent(event: UserModel) {

  }

  onCancel() {

  }
}
