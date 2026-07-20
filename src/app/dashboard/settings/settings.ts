import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Profile } from './profile/profile';
import { Users } from "./users/users";

@Component({
  selector: 'settings',
  imports: [Profile, Users],
  templateUrl: './settings.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './settings.scss',
})
export class Settings {}
