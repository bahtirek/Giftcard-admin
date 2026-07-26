import { Component, ViewChild, inject, ChangeDetectionStrategy, } from '@angular/core';
import { UserForm } from "../user-form/user-form";
import { Location } from '@angular/common';
import { ProfileService } from '../../profile-service';
import { Profile, ProfileModel } from '../../settings.interface';

@Component({
  selector: 'app-add-user',
  imports: [UserForm],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AddUser {
  @ViewChild(UserForm) childRef!: UserForm;

  private location = inject(Location);
  private profileService = inject(ProfileService)

  onSubmitButtonClick() {
    this.childRef?.validateForm();
  }

  async onProfileSubmitEvent(profile: ProfileModel) {
    this.profileService.postProfile(profile as Profile, () => this.onPostComplete())
  }

  onPostComplete ()  {
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
