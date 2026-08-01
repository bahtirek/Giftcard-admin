import { Component, signal, ViewChild, inject } from '@angular/core';
import { UserForm } from "../user-form/user-form";
import { initialUserData, User, UserModel } from '../../settings.interface';
import { UserService } from '../../users.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update-user',
  imports: [UserForm],
  templateUrl: './update-user.html',
  styleUrl: './update-user.scss',
})
export class UpdateUser {
  @ViewChild(UserForm) childRef!: UserForm;

  router = inject(Router)
  location = inject(Location)
  userService = inject(UserService)

  user = signal<User | null>(null);

  ngOnInit() {
    if (!history.state.user || !history.state.user.id) {
      this.location.back();
      return;
    }
    this.user.set(history.state.user);
  }

  onSubmitButtonClick(){
    this.childRef.validateForm()
  }

  onUserSubmitEvent(event: UserModel) {
    this.userService.putUser(event as User, () => {
      const userData = JSON.stringify(event)
      this.router.navigate(['/dashboard/user-details', userData ])
    })
  }

  onCancel() {
    this.location.back();
  }
}
