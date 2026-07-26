import { Component, signal } from '@angular/core';
import { UserForm } from "../user-form/user-form";
import { initialProfileData, ProfileModel } from '../../settings.interface';
import { Profile } from '../../profile/profile';

@Component({
  selector: 'app-update-user',
  imports: [UserForm],
  templateUrl: './update-user.html',
  styleUrl: './update-user.scss',
})
export class UpdateUser {

  //profile = signal<Profile>({})

  onSubmitButtonClick(){

  }

  onProfileSubmitEvent(event: ProfileModel) {

  }

  onCancel() {

  }
}
