import { Component, effect, signal } from '@angular/core';
import { Account, accountSchema, initialAccountData } from './account-form-interface';
import { form, FormField } from '@angular/forms/signals';
import { AppInput } from "../../../common/forms/input/input";

@Component({
  selector: 'account-form',
  imports: [FormField, AppInput],
  templateUrl: './account-form.html',
  styleUrl: './account-form.scss',
})
export class AccountForm {

  accountModel = signal<Account>(initialAccountData);

  accountForm = form(this.accountModel, accountSchema)

  eff = effect(() => {
    console.log('Account123 Model Updated:', this.accountModel());
  });
}
