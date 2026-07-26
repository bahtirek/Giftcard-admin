import { Component, input, output, signal } from '@angular/core';
import { AppInput } from '../../../../common/forms/input/input';
import { Select } from '../../../../common/forms/select/select';
import { Option } from '../../../../interfaces/options';
import { StatusOptions } from '../../../../interfaces/status';
import { ProfileModel, Profile, initialProfileData, profileSchema } from '../../settings.interface';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-user-form',
  imports: [AppInput, Select],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  ngOnInit(): void {
    if(this.profile()?.id) {
      const editingProfile: ProfileModel = this.profile() as ProfileModel;
      this.profileModel.set(editingProfile)
    }
  }


  profile = input<Profile>()
  submitProfile = output<ProfileModel>();

  profileModel = signal<ProfileModel>(initialProfileData);
  statusOptions = signal<any>(StatusOptions)

  profileForm = form(this.profileModel, profileSchema);

  rolesOptions = signal<Option[]>([
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
    { value: 'Sales Person', label: 'Sales Person' },
  ]);

  validateForm() {
    this.profileForm().markAsTouched();
    if (this.profileForm().valid()) {
      this.submitProfile.emit(this.profileModel());
    }
  }
}
