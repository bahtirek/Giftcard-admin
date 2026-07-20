import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  profile = signal({
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

  }
}
