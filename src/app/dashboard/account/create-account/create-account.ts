import { Component } from '@angular/core';
import { AccountForm } from "../account-form/account-form";

@Component({
  selector: 'create-account',
  imports: [AccountForm],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss',
})
export class CreateAccount {}
