import { Component } from '@angular/core';
import { UserForm } from "../user-form/user-form";

@Component({
  selector: 'app-add-user',
  imports: [UserForm],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser {}
