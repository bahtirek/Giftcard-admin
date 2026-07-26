import { Component, ViewChild, inject, ChangeDetectionStrategy, } from '@angular/core';
import { UserForm } from "../user-form/user-form";
import { Location } from '@angular/common';
import { UserService } from '../../user-service';
import { User, UserModel } from '../../settings.interface';

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
  private userService = inject(UserService)

  onSubmitButtonClick() {
    this.childRef?.validateForm();
  }

  async onUserSubmitEvent(user: UserModel) {
    this.userService.postUser(user as User, () => this.onPostComplete())
  }

  onPostComplete ()  {
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
