import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBadgeDirective } from '../../../../directives/status-badge.directive';
import { User } from '../../settings.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [StatusBadgeDirective, DatePipe],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})

export class UserDetails {
  router = inject(Router)
  location = inject(Location)
  userData = input<string>()

  user = computed<User>(() => {
    console.log(this.userData());

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
    this.router.navigate(['/dashboard/update-user'])
  }

  onUserDeleteButtonClick() {

  }
}
