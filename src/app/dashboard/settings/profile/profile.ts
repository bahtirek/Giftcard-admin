import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  router = inject(Router)
  user = signal({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.deo.@example.com',
    phone: '15615611561',
    createdAt: 1783179735278,
    updatedAt: 1783179735278,
    createdBy: 'Admin',
    updatedBy: 'Admin',
  })

  onGiftCardEditButtonClick(){
    this.router.navigate(['/dashboard/update-profile'])
  }
}
