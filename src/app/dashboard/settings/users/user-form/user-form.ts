import { Component, effect, input, output, signal } from '@angular/core';
import { AppInput } from '../../../../common/forms/input/input';
import { Select } from '../../../../common/forms/select/select';
import { Option } from '../../../../interfaces/options';
import { StatusOptions } from '../../../../interfaces/status';
import { UserModel, User, initialUserData, userSchema } from '../../settings.interface';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-user-form',
  imports: [AppInput, Select],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  userEffect = effect(() => {
    if(this.user()?.id) {
      const editingUser: UserModel = this.user() as UserModel;
      this.userModel.set(editingUser)
    }
  })

  user = input<User | null>();
  profile = input<boolean>();
  submitUser = output<UserModel>();

  userModel = signal<UserModel>(initialUserData);
  statusOptions = signal<any>(StatusOptions)

  userForm = form(this.userModel, userSchema);

  rolesOptions = signal<Option[]>([
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
    { value: 'Sales Person', label: 'Sales Person' },
  ]);

  validateForm() {
    this.userForm().markAsTouched();
    if (this.userForm().valid()) {
      this.submitUser.emit(this.userModel());
    }
  }
}
