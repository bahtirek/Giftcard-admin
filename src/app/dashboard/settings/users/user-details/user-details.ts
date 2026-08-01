import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../settings.interface';
import { Location } from '@angular/common';
import { UserDeleteModal } from './user-delete-modal/user-delete-modal';
import { UserService } from '../../users.service';
import { StatusMenu } from '../../../../common/status-menu/status-menu';

@Component({
  selector: 'app-user-details',
  imports: [DatePipe, UserDeleteModal, StatusMenu],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})

export class UserDetails {
  router = inject(Router)
  location = inject(Location)
  userService = inject(UserService)
  userData = input<string>()

  isModalOpen = signal<boolean>(false);
  status = linkedSignal(() => this.user()?.status);

  user = computed<User>(() => {
    const rawJson = this.userData();
    if (!rawJson) {
      this.location.back();
      return null
    }

    try {
      return JSON.parse(rawJson);
    } catch {
      this.location.back()
    }
  });

  onUserUpdateButtonClick(){
    if(!this.userData()) return;
    const user = JSON.parse(this.userData()!)
    this.router.navigate(['/dashboard/update-user'], {
      state: {user: user}
    })
  }

  onUserDeleteButtonClick() {
    this.isModalOpen.set(true)
  }

  onUserDeleteEvent(event: boolean) {
    this.isModalOpen.set(false);
    if(!event) return;
    this.userService.deleteUser(this.user()!, () => {
      this.router.navigate(['/dashboard/settings']);
    });
  }

  onStatusSelectedEvent(status: string) {
    this.userService.patchUserStatus(status, this.user()!.id, () => {
      this.status.set(status)
    })
  }
}
