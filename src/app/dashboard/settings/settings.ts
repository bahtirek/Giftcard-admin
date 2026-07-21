import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Profile } from './profile/profile';
import { Users } from "./users/users";
import { Router } from '@angular/router';

@Component({
  selector: 'settings',
  imports: [Profile, Users],
  templateUrl: './settings.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './settings.scss',
})
export class Settings {
  router = inject(Router)
  onAddUserButtonClicked(){
    this.router.navigate(['/dashboard/add-user'])
  }
}
